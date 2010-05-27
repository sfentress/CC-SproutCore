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
  
  chatHasInitialized: NO,
  
  username: "",
  
  usersInRoom: [],
  
  latestChat: null,       // other controllers can hook into this
  
  initChat: function(channel){
    if (this.comet === null){
        this.comet = new Faye.Client('/chat/comet');
    }

    var _channel = CcChat.chatRoomController.validateChannel(channel);
    CcChat.chatRoomController.set('channel', channel);
    
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

  sendChat: function(message, item){
    
    if (!this.chatHasInitialized){
      SC.Logger.log("initializing chat");
      this.initChat('test');
    }
    var jsonMessage = {author: this.username, message: message, item: item};
    this.post(CcChat.chatRoomController.get('channel'), jsonMessage);
    
    SC.Logger.log("sent: "+message);
  },
  
  post: function(channel, jsonMessage){
    channel = CcChat.chatRoomController.validateChannel(channel);
    this.comet.publish(channel, jsonMessage);
  },
  
  receiveChat: function(message){
    
    SC.Logger.log("received: "+message.message);
    
    SC.RunLoop.begin();
    var chatMessage = CcChat.store.createRecord(CcChat.ChatMessage, {
      author: message.author, 
      message: message.message,
      time: this._now(),
      item: message.item
    });
    this.set('latestChat', chatMessage);
    SC.RunLoop.end();
  },
  
  subscribeToChannel: function(channel, callback){
    var _channel = CcChat.chatRoomController.validateChannel(channel);
    this.comet.subscribe(_channel, callback, this);
  },
  
  subscribeToUserList: function(channel){
    var _channel = CcChat.chatRoomController.validateChannel(channel);
    
    var self = this;
    function updateUserList(message){
      var clients = [].concat(message);
      self.set('usersInRoom', clients);
    }
    
    this.subscribeToChannel('/smeta/clients'+channel, updateUserList);
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
