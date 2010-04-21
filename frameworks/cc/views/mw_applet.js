// ==========================================================================
// Project:   Cc.MwAppletView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CC */

/** @class

  A simple view for embedding MW applets. The only property that must be set is
  the url to the .cml file.

  @extends CC.AppletView
*/
CC.MwAppletView = CC.AppletView.extend(
/** @scope Cc.MwAppletView.prototype */ {  

  cmlUrl: '',         // url to cml file
  
  params: function() {    // adds cml url as the param to the mw applet
    return '<param name="script" value="page:0:import ' + this.get('cmlUrl') + '"/>';
  }.property('cmlUrl'),
  
  jarUrls: 'http://mw2.concord.org/public/lib/mwapplet.jar',
  
  code: 'org.concord.modeler.MwApplet',
  
  width: 600,
  
  height: 400,
  
  classNames: "mw-applet",
  
  layout: { centerX: 0, centerY: 0, width: 600, height: 400 }     // defaults

});