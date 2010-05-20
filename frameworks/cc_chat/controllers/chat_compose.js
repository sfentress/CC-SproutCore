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
  
  sendOnReturnKey: function () {
    var textAreaValue = ""+this.get('textAreaFieldValue');
    var lastChar = textAreaValue.substr(textAreaValue.length-1,1);
    if (lastChar === "\n"){
      this.sendAction();
    }
  }.observes('textAreaFieldValue'),
  
  sendAction: function () {
    var textAreaValue = this.get('textAreaFieldValue');
    SC.Logger.log("textAreaValue: " + textAreaValue);
    var user = "User";
    CcChat.chatController.sendChat(textAreaValue);

    this.set('textAreaValue', '');
  }

}) ;
