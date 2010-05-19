// ==========================================================================
// Project:   CcChat.chatController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat Chat Faye*/

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
CcChat.chatController = SC.ObjectController.create(
/** @scope CcChat.chatController.prototype */ {
  
  comet: null,
  
  channel: "/dummy",
  
  chatHasInitted: NO,
  
  initChat: function(arg){
    this.comet = new Faye.Client('/chat/comet');

    var channel = this.validate(arg);
    
    this.comet.set_username("Test user");
    this.comet.subscribe(channel, this.receiveChat, this);
      
    this.chatHasInitted = YES;
    return channel;
  },

  sendChat: function(author, message){
    SC.Logger.log("trying to send: "+message);
    var chatMessage = CcChat.store.createRecord(CcChat.ChatMessage, {author: author, message: message});
      
    if (!this.chatHasInitted){
      SC.Logger.log("initting chat");
      this.initChat('test');
    }
    var jsonMessage = {message: chatMessage.get('message')};
    SC.Logger.log("jsonMessage: "+jsonMessage.message);
    this.post('test', jsonMessage);
    
    SC.Logger.log("sent: "+chatMessage.get('message'));
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
    alert("Weee, I received a message! "+message.message);
  }

}) ;
