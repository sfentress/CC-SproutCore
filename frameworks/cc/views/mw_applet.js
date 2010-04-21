// ==========================================================================
// Project:   Cc.MwAppletView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CC */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
CC.MwAppletView = SC.View.extend(
/** @scope Cc.MwAppletView.prototype */ {

  cmlUrl: "",         // url to cml file
  
  jarUrls: "http://mw2.concord.org/public/lib/mwapplet.jar",    // if more than one jar, they can be comma-separated
  
  width: 600,
  
  height: 400,

  render: function(context, firstTime) {
    this.get('layout').width = 900;
    var appletHtml = 
      '<applet id="applet1" ' +
      'archive="' + this.get('jarUrls') + '" ' +
      'code="org.concord.modeler.MwApplet" ' +
      'width="100%" ' +
      'height="' + this.get('height') + '">' +
      '<param name="script" value="page:0:' +
      'import ' + this.get('cmlUrl') + '"/>' +
      '</applet>';
      
      context.push(appletHtml);
  },
  
  classNames: "mw-applet",
  
  layout: { centerX: 0, centerY: 0, width: 600, height: 400 }     // defaults

});