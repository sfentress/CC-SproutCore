// ==========================================================================
// Project:   Demos - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Demos CC*/

// This page describes the main user interface for your application.  
Demos.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'mwAppletView'.w(),
    
    mwAppletView: CC.MwAppletView.design({
      cmlUrl: "http://mw2.concord.org/public/student/classic/machine/bike.cml",
      layout: { centerX: 0, centerY: 0, width: 500, height: 400 }
    })
  })

});
