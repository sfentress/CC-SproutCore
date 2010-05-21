// ==========================================================================
// Project:   CcChat.loginController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
CcChat.loginController = SC.ObjectController.create(
/** @scope CcChat.loginController.prototype */ {

  // TODO: Add your own code here.
  username: null,
  
  textAreaValue: null,
  
  welcomeMessage: "",
  
  login: function (){
    var username = this.get('textAreaValue');
    this.set('username', username);
    CcChat.chatController.set('username', username);
    this.set('textAreaValue', '');
    this.set('welcomeMessage', 'Welcome '+username);
  }

}) ;
