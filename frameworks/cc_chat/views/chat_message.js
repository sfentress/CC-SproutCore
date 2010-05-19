// ==========================================================================
// Project:   CcChat.ChatMessageView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
CcChat.ChatMessageView = SC.View.extend(SC.ContentDisplay, 
/** @scope CcChat.ChatMessageView.prototype */ {
  
  contentDisplayProperties: 'author message'.w(),
  
  // TODO: Add your own code here.
  render: function(context, firstTime) {
    var content = this.get('content');
    var author = content.get('author');
    var message = content.get('message');
    
    context = context.begin().addClass('top');
    context = context.begin('p').addClass('name').push('<b>%@</b>: %@'.fmt(author, message)).end();
    context = context.end(); // div.top
    
     sc_super();
  }
});
