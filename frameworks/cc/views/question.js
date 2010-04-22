// ==========================================================================
// Project:   Cc.QuestionView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CC */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
CC.QuestionView = SC.StackedView.extend(SC.StaticLayout, {
	
	layout: {top: 0, left: 0, right: 0},

  classNames: ['question'],

  contentDisplayProperties: 'prompt'.w(),

	prompt: "[prompt]",
	
	useStaticLayout: NO,
		
	childViews: 'promptView inputWrapperView'.w(),
	
	promptView: SC.LabelView.design(SC.StaticLayout, {
		classNames: 'question-prompt',
		useStaticLayout: YES,
		escapeHTML: NO,
		layout: { left: 5, right: 5 },
		valueBinding: "*parentView.prompt"
	}),

	inputWrapperView: SC.View.design(SC.StaticLayout, {
		layout: {left: 20, top: 5, width: 600, height: 95 },
		useStaticLayout: YES,
		childViews: 'inputView'.w(),
		inputView: SC.TextFieldView.design(SC.StaticLayout, {
			classNames: 'question-input',
			isTextArea: YES
		})
	})

});
