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
      prompt: "What do you think of this different fine question?<br/>This <span style='font-weight: bold;'>question</span> has <span style='font-style: oblique;'>styling</span>.",
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

// TODO: Replace with real unit test for Cc.MultipleChoiceQuestionView
test("multiple choice question should contain choice radio buttons", function() {
  var input = mwChoiceViewRendered.$('.question-input');
  
  ok(input.find('input').size() === 5, "There should be five choices");
  
  var firstChoice = input.find('.sc-button-label').first().html();
  equals(firstChoice, "one", "first choice should be 'one'");
  
  var lastChoice = input.find('.sc-button-label').last().html();
  equals(lastChoice, "five", "last choice should be 'five'");
});

