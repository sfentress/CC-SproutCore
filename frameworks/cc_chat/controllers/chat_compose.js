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
  
  textAreaValue: null,            // for some reason, we can only set using "value" and not "fieldValue"
  
  item: null,
  
  sendAction: function () {
    var textAreaValue = this.get('textAreaValue');
    SC.Logger.log("textAreaValue: " + textAreaValue);
    var user = "User";
    CcChat.chatController.sendChat(textAreaValue, this.get('item'));

    this.set('textAreaValue', '');
  },
  
  imageUrl: function() {
    var item = CcChat.chatComposeController.get('item');
    if (item !== null && item.imageUrl !== undefined && item.imageUrl !== null){
      return item.imageUrl;
    }
    return "";
  }.property('item'),
    
  imageWidth: function() {
    if (this.get('imageUrl').length > 0){
      return 40;
    } else {
      // return 0;
      return 40;
    }
  }.property('imageUrl')

}) ;
