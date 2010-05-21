// ==========================================================================
// Project:   CcChat.userListController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
CcChat.userListController = SC.ArrayController.create(
/** @scope CcChat.userListController.prototype */ {
  
  contentBinding: 'CcChat.chatController.usersInRoom'
  
}) ;
