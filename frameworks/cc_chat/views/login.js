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

  // TODO: Add your own code here.
  childViews: 'inputView loginButtonView welcomeView'.w(),
	
  inputView: SC.View.design(SC.StaticLayout, {
    layout: {left: 20, top: 5, width: 200, height: 24 },
		useStaticLayout: YES,
		childViews: 'textFieldView'.w(),
    textFieldView: SC.TextFieldView.design({
      isTextArea: NO,
      valueBinding: "CcChat.loginController.textAreaValue",
      keyUp: function (evt){
        if (evt.keyCode === 13){
          CcChat.loginController.login();
        }
        this.fieldValueDidChange();
        evt.allowDefault(); 
        return YES;
      }
		})
	}),
	
  loginButtonView: SC.ButtonView.design({
    layout: { top: 5, height: 24, left: 240, width: 100 },
    title:  "Log in",
    target: "CcChat.loginController",
    action: "login"
  }),
  
  welcomeView: SC.LabelView.design({
      layout: { top: 5, height: 24, left: 370, width: 200 },
      value: "",
      valueBinding: SC.Binding.from('CcChat.loginController.welcomeMessage').oneWay()
  })
});
