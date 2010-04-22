// ==========================================================================
// Project:   Cc.QuestionView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CC */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
CC.QuestionView = SC.View.extend({
	
	layout: {top: 0, left: 0, right: 0, bottom: 0},

  classNames: ['question'],

  contentDisplayProperties: 'prompt'.w(),

	prompt: "[prompt]",

  // childViews: 'promptView inputView'.w(),
	childViews: 'stackView'.w(),
	
	stackView: SC.StackedView.design({
		layout: {top: 0, left: 0, right: 0},
		
		childViews: 'promptView inputWrapperView'.w(),
		promptBinding: "*parentView.prompt",
		
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
	})

});
