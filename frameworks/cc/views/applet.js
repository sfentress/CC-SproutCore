// ==========================================================================
// Project:   Cc.AppletView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CC */

/** @class

  A simple view for embedding applets

  @extends SC.View
*/
CC.AppletView = SC.View.extend(
/** @scope Cc.AppletView.prototype */ {
  
  jarUrls: '',    // e.g. 'http://mw2.concord.org/public/lib/mwapplet.jar'. If more than one jar, they can be comma-separated
  
  code: '',       // main class. e.g. 'org.concord.modeler.MwApplet'
  
  params: '',     // any params, as html. e.g. '<param name="script" value="..."/>'
  
  width: 600,
  
  height: 400,

  render: function(context, firstTime) {
      context.push(this.getAppletHtml());
  },
  
  getAppletHtml: function() {
    var appletHtml = 
      '<applet ' +
      'archive="' + this.get('jarUrls') + '" ' +
      'code="' + this.get('code') + '" ' +
      'width="100%" ' +
      'height="' + this.get('height') + '">' +
      this.get('params') +
      '</applet>';
      
      return appletHtml;
  },
  
  classNames: "applet",
  
  layout: { centerX: 0, centerY: 0, width: 600, height: 400 }     // defaults

});
