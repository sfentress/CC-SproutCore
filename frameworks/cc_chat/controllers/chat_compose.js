// ==========================================================================
// Project:   CcChat.chatComposeController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
CcChat.chatComposeController = SC.ObjectController.create(
/** @scope CcChat.chatComposeController.prototype */ {

  textAreaFieldValue: null,      // current value of chat text area
  
  textAreaValue: null,            // for some reason, we can only set using "value" and not "fieldValue"
  
  sendAction: function() {
    var textAreaValue = this.get('textAreaFieldValue');
    SC.Logger.log("textAreaValue: " + textAreaValue);
    var user = "User";
    CcChat.chatController.sendChat(user, textAreaValue);

    this.set('textAreaValue', '');
  }

}) ;