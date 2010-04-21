// ==========================================================================
// Project:   Cc.QuestionView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CC */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
CC.QuestionView = SC.View.extend(SC.ContentDisplay, {

  classNames: ['question'],

  contentDisplayProperties: 'prompt input'.w(),

  render: function(context, firstTime) {
    var prompt = '[prompt]';
    var input = '[input]';
    
    var content = this.get('content');
    if (content != null) {
      prompt = content.get('prompt');
      input = content.get('input');
    }
      
    context.push("Prompt: "+prompt+", Input: "+input);
  }
});
