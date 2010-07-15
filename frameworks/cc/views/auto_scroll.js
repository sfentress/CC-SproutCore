// ==========================================================================
// Project:   CC.AutoScollView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CC */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
CC.AutoScrollView = SC.ScrollView.extend(
/** @scope Cc.AutoScollView.prototype */ {

  autoScrollTrigger: null,     // bind this to anything that changes to have it scroll to bottom on change
  
  autoScroll: function() {
    var self = this;
    function scrollToMax() {
      var maxY = self.get('maximumVerticalScrollOffset');
      self.set('verticalScrollOffset', maxY) ;
    }
    // double invoke last -- this fixes a problem where it would sometimes
    // not scroll far enough, leaving the last item or 2 still not showing
    self.invokeLast(function() { self.invokeLast(scrollToMax); });
  }.observes('autoScrollTrigger')
});
