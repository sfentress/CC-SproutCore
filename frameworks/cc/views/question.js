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
		
		childViews: 'promptView inputView'.w(),
		promptBinding: "*parentView.prompt",
		
		promptView: SC.LabelView.design({
			classNames: 'question-prompt',
			useStaticLayout: YES,
			escapeHTML: NO,
			layout: {top: 15, left: 5, right: 5},
			valueBinding: "*parentView.prompt",
			render: function(context, firstTime) {
				sc_super();
				context.addStyle('height', 'auto');
				context.addStyle('bottom', null);
			}
		}),

		inputView: SC.TextFieldView.design({
			classNames: 'question-input',
			useStaticLayout: YES,
			isTextArea: YES,
			layout: {left: 15, width: 400, top: 15, height: 95 },
			render: function(context, firstTime) {
				sc_super();
				// context.addStyle('height', null);
			}
		})
	})

});
