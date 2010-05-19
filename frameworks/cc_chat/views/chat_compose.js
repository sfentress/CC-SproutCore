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
			isTextArea: YES
		})
	}),
	
	sendView: SC.ButtonView.design({
       layout: { centerY: 0, height: 24, right: 600, width: 100 },
       title:  "Chat!",
       action: "this.parentView.sendAction"
     }),
     
     sendAction: function() {
         var textField = this.inputView.get('textFieldView');
         var content = textField.get('value');
         var user = "User";
         CcChat.chatController.sendChat(user, content);
     }
});
