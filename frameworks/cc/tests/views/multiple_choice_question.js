// ==========================================================================
// Project:   Cc.MultipleChoiceQuestionView Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CC module test ok equals same stop start */

var mwChoiceView, pane, mwChoiceViewRendered;

var CHOICES = "one two three four five".w();

module("CC.MultipleChoiceQuestionView", {
  setup: function() {
    SC.RunLoop.begin();
    mwChoiceView = CC.MultipleChoiceQuestionView.design({
      prompt: "What do you think of this different fine question?",
  		choices: CHOICES
    });
    
    pane = SC.MainPane.create({
      childViews: [mwChoiceView]
    });
    pane.append();
    SC.RunLoop.end();
  
    mwChoiceViewRendered = pane.childViews[0];
  },
  
  teardown: function() {
   pane.remove();
   pane = mwChoiceView = mwChoiceViewRendered = null;
  }
});

test("multiple choice question should contain choice radio buttons", function() {
  var input = mwChoiceViewRendered.$('.question-input');
  
  ok(input.find('.sc-button-label').size() === 5, "There should be five choices but was "+input.find('.sc-button-label').size());
  
  var firstChoice = input.find('.sc-button-label').first().html();
  equals(firstChoice, "one", "first choice should be 'one'");
  
  var lastChoice = input.find('.sc-button-label').last().html();
  equals(lastChoice, "five", "last choice should be 'five'");
});

