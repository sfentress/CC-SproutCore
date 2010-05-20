// ==========================================================================
// Project:   CcChat.ChatComposeView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
CcChat.ChatComposeView = SC.StackedView.extend(SC.StaticLayout,
/** @scope CcChat.ChatComposeView.prototype */ {

  // TODO: Add your own code here.
  childViews: 'inputView sendView'.w(),
	
  inputView: SC.View.design(SC.StaticLayout, {
    layout: {left: 20, top: 5, width: 600, height: 95 },
		useStaticLayout: YES,
		childViews: 'textFieldView'.w(),
    textFieldView: SC.TextFieldView.design({
      isTextArea: YES,
      fieldValueBinding: "CcChat.chatComposeController.textAreaFieldValue",
      valueBinding: "CcChat.chatComposeController.textAreaValue"
		})
	}),
	
  sendView: SC.ButtonView.design({
    layout: { top: 110, height: 24, right: 600, width: 100 },
    title:  "Chat",
    action: "CcChat.chatComposeController.sendAction"
  })
});
