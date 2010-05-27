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
  childViews: 'inputView imageView clearImageView sendView'.w(),
  
  // imageWidth: 50,
  
  // imageWidthBinding: 'CcChat.chatComposeController.imageWidth',
	
  inputView: SC.View.design(SC.StaticLayout, {
    layout: {left: CcChat.chatComposeController.get('imageWidth'), top: 0, right: 0, height: 35 },
		useStaticLayout: YES,
		childViews: 'textFieldView'.w(),
    textFieldView: SC.TextFieldView.design({
      isTextArea: NO,
      valueBinding: "CcChat.chatComposeController.textAreaValue",
      keyUp: function (evt){
        if (evt.keyCode === 13){
          CcChat.chatComposeController.sendAction();
        }
        this.fieldValueDidChange();
        evt.allowDefault(); 
        return YES;
      }
		})
	}),
	
  imageView: SC.ImageView.design({
    layout: {top: 2, left: 0, height: 35, width: this.imageWidth},
    value: '',
    valueBinding: 'CcChat.chatComposeController.imageUrl'
  }),
  
  clearImageView: SC.ButtonView.design({
    layout: { top: 60, height: 24, right: 125, width: 120 },
    title:  "Remove dragon",
    target: 'Geniverse.challangeController',
    action: "clearDragon",
    isVisibleBinding: 'Geniverse.challangeController.showClearButton'
  }),
	
  sendView: SC.ButtonView.design({
    layout: { top: 60, height: 24, right: 20, width: 100 },
    title:  "Chat",
    action: "CcChat.chatComposeController.sendAction"
  })
});
