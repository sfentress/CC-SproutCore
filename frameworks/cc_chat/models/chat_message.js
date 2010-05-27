// ==========================================================================
// Project:   CcChat.ChatMessage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SC CcChat */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
CcChat.ChatMessage = SC.Record.extend(
/** @scope CcChat.ChatMessage.prototype */ {

    author: SC.Record.attr(String),
    
    message: SC.Record.attr(String),
    
    time: SC.Record.attr(Number),
    
    item: SC.Record.attr(Object)     // if items[0] is a json object with the attr imageUrl, that image will be shown in chat

}) ;
