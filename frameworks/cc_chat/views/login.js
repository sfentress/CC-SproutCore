// ==========================================================================
// Project:   CcChat.LoginView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
CcChat.LoginView = SC.View.extend(
/** @scope CcChat.LoginView.prototype */ {
  
  showPasswordField: YES,

  // TODO: Add your own code here.
  childViews: 'nameLabel nameField passwordLabel passwordField retypePasswordLabel retypePasswordField loginButtonView registerButtonView welcomeView'.w(),
  
  nameLabel: SC.LabelView.design({
    layout: {left: 40, top: 5, width: 80, height: 24 },
    value: "Username",
    fontWeight: SC.BOLD_WEIGHT
	}),
	
  nameField: SC.TextFieldView.design({
    layout: {left: 130, top: 5, width: 200, height: 24 },
    isTextArea: NO,
    valueBinding: 'CcChat.loginController.textAreaValue',
    keyUp: function (evt){
      if (evt.keyCode === 13){
        CcChat.loginController.login();
      }
      this.fieldValueDidChange();
      evt.allowDefault(); 
      return YES;
    }
	}),
	
	passwordLabel: SC.LabelView.design({
    layout: {left: 40, top: 35, width: 80, height: 24 },
    value: "Password",
    fontWeight: SC.BOLD_WEIGHT,
    isVisibleBinding: '*parentView.showPasswordField'
	}),
	
  passwordField: SC.TextFieldView.design({
    layout: {left: 130, top: 35, width: 200, height: 24 },
    isPassword: YES,
    isTextArea: NO,
    valueBinding: 'CcChat.loginController.passwordValue',
    keyUp: function (evt){
      if (evt.keyCode === 13){
        CcChat.loginController.login();
      }
      this.fieldValueDidChange();
      evt.allowDefault(); 
      return YES;
    },
    isVisibleBinding: '*parentView.showPasswordField'
	}),
	
 retypePasswordLabel: SC.LabelView.design({
    layout: {left: 0, top: 65, width: 120, height: 24 },
    value: "Retype Password",
    fontWeight: SC.BOLD_WEIGHT,
    isVisibleBinding: 'CcChat.loginController.showRetypeField'
	}),
	
  retypePasswordField: SC.TextFieldView.design({
    layout: {left: 130, top: 65, width: 200, height: 24 },
    isPassword: YES,
    isTextArea: NO,
    valueBinding: 'CcChat.loginController.retypePasswordValue',
    keyUp: function (evt){
      if (evt.keyCode === 13){
        CcChat.loginController.login();
      }
      this.fieldValueDidChange();
      evt.allowDefault(); 
      return YES;
    },
    isVisibleBinding: 'CcChat.loginController.showRetypeField'
	}),
	
  loginButtonView: SC.ButtonView.design({
    layout: { top: 35, height: 24, left: 350, width: 100 },
    title:  "Log in",
    target: 'CcChat.loginController',
    action: 'login',
    isVisibleBinding: SC.Binding.not('CcChat.loginController.showRetypeField'),
    
    init: function() {
      if (!this.get('parentView').get('showPasswordField')){
        this.adjust({ top: 5 });
      }
  		sc_super();
  	}
  }),
  
  registerButtonView: SC.ButtonView.design({
    layout: { top: 65, height: 24, left: 350, width: 140 },
    title:  "Register new user",
    target: 'CcChat.loginController',
    action: 'register',
    isVisibleBinding: '*parentView.showPasswordField'
  }),
  
  welcomeView: SC.LabelView.design({
      layout: { top: 5, height: 24, left: 370, width: 200 },
      value: "",
      valueBinding: SC.Binding.from('CcChat.loginController.welcomeMessage').oneWay()
  })
});
