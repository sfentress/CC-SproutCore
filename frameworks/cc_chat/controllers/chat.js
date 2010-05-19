// ==========================================================================
// Project:   CcChat.chatController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat ChatService*/

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
CcChat.chatController = SC.ObjectController.create(
/** @scope CcChat.chatController.prototype */ {
    
    chatHasInitted: NO,

  sendChat: function(author, message){
      SC.Logger.log("trying to send: "+message);
      var chatMessage = CcChat.store.createRecord(CcChat.ChatMessage, {author: author, message: message});
      
      if (!this.chatHasInitted){
          SC.Logger.log("initting chat");
          ChatService.initChat('test');
          this.chatHasInitted = YES;
    }
    var jsonMessage = {message: chatMessage.get('message')};
     SC.Logger.log("jsonMessage: "+jsonMessage.message);
      ChatService.post('test', jsonMessage);
      
      SC.Logger.log("sent: "+chatMessage.get('message'));
  },
  
  receiveChat: function(message){
  	alert("Weee, I received a message! "+message);
  }

}) ;
