// ==========================================================================
// Project:   Cc.AutoScrollView Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Q$ CC CcChat module test ok equals same stop start */

var autoScrollView, pane, autoScrollViewRendered;

var chatQuery = SC.Query.local(CcChat.ChatMessage,{orderBy: 'time'});
var chats = CcChat.store.find(chatQuery);
CcChat.chatListController.set('content', chats);

module("CC.AutoScrollView", {
  setup: function() {
    SC.RunLoop.begin();
      autoScrollView = CC.AutoScrollView.design({
  		  hasHorizontalScroller: NO,
        layout: { left: 10, bottom: 50, height: 180, width: 300 },
        backgroundColor: 'white',
        contentView: SC.StackedView.design({
  				contentBinding: 'CcChat.chatListController.arrangedObjects',
  				selectionBinding: 'CcChat.chatListController.selection',
  				rowHeight: 30,
  				canEditContent: NO,
  				hasContentIcon: YES,
  				contentValueKey: 'message',
  				isSelectable: YES,
  				showAlternatingRows: YES,
  				exampleView: CcChat.ChatMessageView
        }),
        autoScrollTriggerBinding:  'CcChat.chatListController.length'
      });
    
      pane = SC.MainPane.create({
        childViews: [autoScrollView]
      });
      pane.append();
    SC.RunLoop.end();
    
    autoScrollViewRendered = pane.childViews[0];
    window.autoScrollViewRendered = autoScrollViewRendered;
  },
  
  teardown: function() {
    pane.remove();
    pane = autoScrollView = autoScrollViewRendered = null;
  }
});

function addNewElement() {
  SC.RunLoop.begin();
  var chatMessage = CcChat.store.createRecord(CcChat.ChatMessage, {
        author: 'message author', 
        message: "Another item " + Math.random(),
        time: new Date().getTime(),
        item: null
      });
  SC.RunLoop.end();
  return chatMessage;
}

function boundsForView(view) {
  var bounds = {top: 0, left: 0, bottom: 0, right: 0};
  // var id = '#'+view.layerId;
  // var layer = Q$(id);
  var layer = view.$();
  var off = layer.offset();
  bounds.top = off.top;
  bounds.left = off.left;
  bounds.right = bounds.left+layer.width();
  bounds.bottom = bounds.top+layer.height();

  return bounds;
}

function viewStr(view) {
  return "(" + view.getPath('content.message') + ")";
}

function strForBounds(b) {
 return "l: " + b.left + ", t: " + b.top + ", b: " + b.bottom + ", r: " + b.right;
}

function debugStringForView(view) {
  var out = "";
  out += viewStr(view);
  out += " -- msg bounds: " + strForBounds(boundsForView(view));
  out += " -- scroller bounds: " + strForBounds(boundsForView(autoScrollViewRendered));
  return out;
}

function isTotallyInside(dim1, dim2) {
  if (
    (dim1.top >= dim2.top) &&
    (dim1.left >= dim2.left) &&
    (dim1.bottom <= (dim2.bottom+2)) &&
    (dim1.right <= dim2.right)
   ) { return YES; }
  return NO;
}

function isViewShowing(view) {
  var scroller = boundsForView(autoScrollViewRendered);
  var msg = boundsForView(view);
  return isTotallyInside(msg, scroller);
}

// tests if the last 3 views are showing, and the view at index 'first' is not showing
function testViews(views, first) {
  
  var viewIsShowing = false;
  
  var viewsToTest = [views.objectAt(first), views.objectAt(views.length-3), views.objectAt(views.length-2), views.objectAt(views.length-1)];
  var descriptions = ["previous element should not be showing","third to last element should be showing","next to last element should be showing","last element should be showing"];
  
  for (var i = 0; i < viewsToTest.length; i++) {
    // check if first item is not visible
    viewIsShowing = isViewShowing(viewsToTest[i]);
    if (i === 0) { viewIsShowing = !viewIsShowing; } // we don't want the first item to show
    var desc = descriptions[i];
    if (! viewIsShowing) {
      desc += " " +  debugStringForView(viewsToTest[i]);
    }
    ok(viewIsShowing, desc);
  }
}

test("auto scroll view should automatically scroll to show the most recently added element", function() {
  // add enough items to make it scroll
  var lastElement;
  for (var i = 0; i < 15; i++) {
    lastElement = addNewElement();
  }

  var views = autoScrollViewRendered.getPath('contentView.childViews');
  testViews(views, 0);

  if (isViewShowing(views.objectAt(views.length-1))) {
    // add more items
    for (i = 0; i < 100; i++) {
      lastElement = addNewElement();
    }

    views = autoScrollViewRendered.getPath('contentView.childViews');
    testViews(views, views.length-20);
  }
});

