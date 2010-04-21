// ==========================================================================
// Project:   Cc.MwAppletView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Cc */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
CC.MwAppletView = SC.View.extend(
/** @scope Cc.MwAppletView.prototype */ {

  render: function(context, firstTime) {
      context.push('<div class="mw-applet">MW Applet</div>');
  }

});
