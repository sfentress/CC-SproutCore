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
  
  textAreaValue: null,
  
  username: null,
  
  usernameBinding: 'CcChat.chatController.username',
  
  welcomeMessage: function(){
    var username = this.get('username');
    if (username !== undefined && username !== null && username.length > 0){
      return "Welcome " + username;
    } else {
      return "";
    }
  }.property('username'),
  
  login: function (){
    var username = this.get('textAreaValue');
    SC.Logger.log('setting');
    CcChat.chatController.set('username', username);
    this.set('textAreaValue', '');
  }

}) ;
