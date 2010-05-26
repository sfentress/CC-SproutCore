// ==========================================================================
// Project:   CcChat.chatController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat Faye*/

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
CcChat.chatController = SC.ObjectController.create(
/** @scope CcChat.chatController.prototype */ {
  
  comet: new Faye.Client('/chat/comet'),
  
  channel: "",
  
  channelBinding: 'CcChat.chatRoomController.channel',
  
  chatHasInitialized: NO,
  
  username: "",
  
  usersInRoom: [],
  
  initChat: function(channel){
    if (this.comet === null){
        this.comet = new Faye.Client('/chat/comet');
    }

    var _channel = this.validateChannel(channel);
    this.set('channel', channel);
    
    var username = this.get('username');
    if (username.length < 1){
      username = "Test User";
      this.set('username', username);
    }
    this.comet.set_username(username);
    
    this.subscribeToChannel(_channel, this.receiveChat);
    
    this.subscribeToUserList(_channel);
      
    this.chatHasInitialized = YES;
    return channel;
  },

  sendChat: function(message){
    
    if (!this.chatHasInitialized){
      SC.Logger.log("initializing chat");
      this.initChat('test');
    }
    
    var jsonMessage = {author: this.username, message: message};
    this.post(this.get('channel'), jsonMessage);
    
    SC.Logger.log("sent: "+message);
  },
  
  post: function(channel, jsonMessage){
    channel = this.validateChannel(channel);
    this.comet.publish(channel, jsonMessage);
  },
  
  receiveChat: function(message){
    
    SC.Logger.log("received: "+message.message);
    
    SC.RunLoop.begin();
    var chatMessage = CcChat.store.createRecord(CcChat.ChatMessage, {
      author: message.author, 
      message: message.message,
      time: this._now()
    });
    SC.RunLoop.end();
  },
  
  subscribeToChannel: function(channel, callback){
    var _channel = this.validateChannel(channel);
    this.comet.subscribe(_channel, callback, this);
  },
  
  subscribeToUserList: function(channel){
    var _channel = this.validateChannel(channel);
    
    var self = this;
    function updateUserList(message){
      var clients = [].concat(message);
      self.set('usersInRoom', clients);
    }
    
    this.subscribeToChannel('/smeta/clients'+channel, updateUserList);
  },
  
  validateChannel: function(channel){
    if (channel.slice(0,1) != "/"){
      channel = "/"+channel;
    }
    return channel;
  },
  
  _usernameSet: function () {
    if (this.chatHasInitialized){
      var username = this.get('username');
      this.comet.set_username(username);
    }
  }.observes('username'),
  
  _now: function() { 
    return new Date().getTime();  // for now, just using time as ms, so we can order easily.
  }
  

}) ;
