// ==========================================================================
// Project:   CcChat.UserListView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
CcChat.UserListView = SC.ScrollView.extend({
  hasHorizontalScroller: NO,
  layout: { height: 100 },
  backgroundColor: 'white',
  contentView: SC.ListView.design({
		contentBinding: 'CcChat.userListController.arrangedObjects',
		selectionBinding: 'CcChat.userListController.selection',
		rowHeight: 30,
		canEditContent: NO,
		isSelectable: YES,
		showAlternatingRows: YES
  })
});
