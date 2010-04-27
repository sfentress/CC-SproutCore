// ==========================================================================
// Project:   Cc.AppletView Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CC module test ok equals same stop start */

var appletView, pane, appletViewRendered;

var JARS = "samplejar.jar";
var CODE = "sampleclass.class";
var PARAMS = "sampleparam";


module("CC.AppletView", {
  setup: function() {
    SC.RunLoop.begin();
    appletView = CC.AppletView.design({
      jarUrls: JARS,
      code: CODE,
      params: PARAMS
    });
    
    pane = SC.MainPane.create({
      childViews: [appletView]
    });
    pane.append();
    SC.RunLoop.end();
  
    appletViewRendered = pane.childViews[0];
  },
  
  teardown: function() {
    pane.remove();
    pane = appletView = appletViewRendered = null;
  }
});


test("applet html should contain correct properties", function() {
  var applet   = appletViewRendered.$('applet');
  ok (applet.get(0) !== undefined, "applet is created");
  
  var archive  = applet.attr('archive');
  ok(archive === JARS, 'applet archive attribute set correctly');
  
  var code  = applet.attr('code');
  ok(code === CODE, 'applet code attribute set correctly');
  
  var param = applet.html();
  ok(param.indexOf(PARAMS) > -1, 'applet contains correct param');
});
