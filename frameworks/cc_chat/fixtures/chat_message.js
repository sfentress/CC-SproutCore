// ==========================================================================
// Project:   CcChat.ChatMessage Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat */

sc_require('models/chat_message');

CcChat.ChatMessage.FIXTURES = [

  // TODO: Add your data fixtures here.
  // All fixture records must have a unique primary key (default 'guid').  See 
  // the example below.

   { guid: 1,
     author: "Alice",
     message: "Hi Bob!" },
  
   { guid: 2,
     author: "Bob",
     message: "Hello to you, Alice!" }

];
