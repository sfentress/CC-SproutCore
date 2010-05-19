// ==========================================================================
// Project:   CcChat
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat */

/** @namespace

  My cool new framework.  Describe your framework.
  
  @extends SC.Object
*/
CcChat = SC.Object.create(
  /** @scope CcChat.prototype */ {

  NAMESPACE: 'CcChat',
  VERSION: '0.1.0',

  // TODO: Add global constants or singleton objects needed by your app here.
  store: SC.Store.create().from(SC.Record.fixtures)
}) ;
