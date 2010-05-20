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
  
  loginOnReturnKey: function () {         // should be listening for a key press instead...
    var username = ""+this.get('username');
    var lastChar = username.substr(username.length-1,1);
    if (lastChar === "\n"){
      this.login();
    }
  }.observes('username'),
  
  login: function (){
    var username = this.get('username');
    CcChat.chatController.set('username', username);
    this.set('textAreaValue', '');
    this.set('welcomeMessage', 'Welcome '+username);
  }

}) ;
