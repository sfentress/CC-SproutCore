// ==========================================================================
// Project:   Cc.MwAppletView Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CC module test ok equals same stop start */

var mwAppletView, pane, mwAppletViewRendered;

var CML_URL = "http://mw2.concord.org/public/student/classic/machine/bike.cml";

module("CC.MwAppletView", {
  setup: function() {
    SC.RunLoop.begin();
    mwAppletView = CC.MwAppletView.design({
      cmlUrl: CML_URL
    });
    
    pane = SC.MainPane.create({
      childViews: [mwAppletView]
    });
    pane.append();
    SC.RunLoop.end();
  
    mwAppletViewRendered = pane.childViews[0];
  },
  
  teardown: function() {
    pane.remove();
    pane = mwAppletView = mwAppletViewRendered = null;
  }
});

test("applet should contain MW jar and CML file", function() {
  
  // we should be able to do this:
  //    var applet   = mwAppletViewRendered.$('applet');
  //    var archive  = applet.attr('archive')
  //    [check that archive is correct]
  // but applet.attr('archive') throws an error (while applet.html() works just fine)
  
  var appletHTML   = mwAppletViewRendered.$().html();
  ok(appletHTML.indexOf('http://mw2.concord.org/public/lib/mwapplet.jar') > -1, 'applet contains MW jar');
  
  
  var applet   = mwAppletViewRendered.$('applet');
  var param = applet.html();
  ok(param.indexOf(CML_URL) > -1, 'applet contains param with cml file');
});

