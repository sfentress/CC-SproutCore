// ==========================================================================
// Project:   Cc.QuestionView Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CC module test ok equals same stop start */

var questionView, pane, questionViewRendered;

var PROMPT = "What do you think of this fine question?";

module("CC.QuestionView", {
  setup: function() {
    SC.RunLoop.begin();
      questionView = CC.QuestionView.design({
        prompt: PROMPT
      });
      
        pane = SC.MainPane.create({
          childViews: [questionView]
        });
        pane.append();
        SC.RunLoop.end();
        
        questionViewRendered = pane.childViews[0];
  },
  
  teardown: function() {
    pane.remove();
    pane = questionView = questionViewRendered = null;
  }
});

test("question should render with a prompt and a text area", function() {
  var renderedPrompt   = questionViewRendered.$('.question-prompt').html();
  equals(renderedPrompt, PROMPT, "rendered prompt should equal given prompt");
  
  var input = questionViewRendered.$('.question-input');
  ok(input.find('textarea').size() === 1, "text area should exist");
});

