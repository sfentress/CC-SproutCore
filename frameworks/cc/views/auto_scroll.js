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
    SC.Timer.schedule({
			action: scrollToMax,
			interval: 100,
			repeats: NO
		});
  }.observes('autoScrollTrigger')
});
