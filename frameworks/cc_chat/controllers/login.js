// ==========================================================================
// Project:   CcChat.loginController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat */

/** @class

  This view currently does nothing but set the 'username' property on
  chatController. However, it can be used by other views that want to
  hook into the login process. For instance, if the students start out
  seeing a login field, a controller can be watching the username property
  on chatController and, once it is set, log in and start up the application.

  @extends SC.Object
*/
CcChat.loginController = SC.ObjectController.create(
/** @scope CcChat.loginController.prototype */ {

  // TODO: Add your own code here.
  
  textAreaValue: null,
  
  username: null,
  
  passwordValue: null,
  
  retypePasswordValue: null,
  
  usernameBinding: 'CcChat.chatController.username',
  
  showRetypeField: NO,
  
  test: 35,
  
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
    CcChat.chatController.set('username', username);
    this.set('textAreaValue', '');
  },
  
  register: function (){
    if (!this.get('showRetypeField')){
      this.set('showRetypeField', YES);
    } else {
      if (this.get('passwordValue') === this.get('retypePasswordValue')){
        var username = this.get('textAreaValue');
        alert("Welcome "+username + "!");
        CcChat.chatController.set('username', username);
        
      } else {
        alert("The two passwords do not match");
      }
    }
  }

}) ;
