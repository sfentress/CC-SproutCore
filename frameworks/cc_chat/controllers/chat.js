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
  
  comet: null,
  
  channel: "/dummy",
  
  chatHasInitted: NO,
  
  username: "Test user",
  
  initChat: function(arg){
    this.comet = new Faye.Client('/chat/comet');

    var channel = this.validate(arg);
    
    this.comet.set_username(this.username);
    this.comet.subscribe(channel, this.receiveChat, this);
      
    this.chatHasInitted = YES;
    return channel;
  },

  sendChat: function(author, message){
    
    if (!this.chatHasInitted){
      SC.Logger.log("initting chat");
      this.initChat('test');
    }
    
    var jsonMessage = {author: this.username, message: message};
    this.post('test', jsonMessage);
    
    SC.Logger.log("sent: "+message);
  },
  
  post: function(channel, jsonMessage){
    channel = this.validate(channel);
    this.comet.publish(channel, jsonMessage);
  },
  
  validate: function(channel){
    if (channel.slice(0,1) != "/"){
      channel = "/"+channel;
    }
    return channel;
  },
  
  receiveChat: function(message){
    
    SC.Logger.log("received: "+message.message);
    
    SC.RunLoop.begin();
    var chatMessage = CcChat.store.createRecord(CcChat.ChatMessage, {
      author: message.author, 
      message: message.message,
      time: ""+this.now()
    });
    SC.RunLoop.end();
  },
  
  now: function() { 
    return new Date().getTime();  // for now, just using time as ms, so we can order easily.
  }
  

}) ;
