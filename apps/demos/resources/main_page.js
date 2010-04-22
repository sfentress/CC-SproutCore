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
    childViews: 'tabView'.w(),
    
    tabView: SC.TabView.design({ 
      layout: {top: 30, bottom: 5, left: 5, right: 5 }, 
      items: [ 
        {title: "Welcome", value: "demos" },
        {title: "MW Applet", value: "mwAppletView" },
        {title: "Generic Applet", value: "pedigreeAppletView" },
        {title: "Inner pages", value: "innerTabView" },
				{title: "Question 1", value: "question1View" },
				{title: "Question 2", value: "question2View" }
      ], 
      itemTitleKey: 'title', 
      itemValueKey: 'value', 
      nowShowing: 'demos', // defining the startup tab 
      userDefaultKey: 'mainPaneTab'
    })
    
  }),
  
  // sample MW applet view
  mwAppletView: CC.MwAppletView.design({
    cmlUrl: "http://mw2.concord.org/public/student/classic/machine/bike.cml",
    layout: { centerX: 0, centerY: 0, width: 500, height: 400 }
  }),

  pedigreeAppletView: CC.AppletView.design({
    jarUrls: "http://geniverse.dev.concord.org/Geniverse-Experiments/Comet-streamhub/lib/biologica-applets-0.1.0-SNAPSHOT.jar, http://geniverse.dev.concord.org/Geniverse-Experiments/Comet-streamhub/lib/biologica-0.1.0-SNAPSHOT.jar, http://geniverse.dev.concord.org/Geniverse-Experiments/Comet-streamhub/lib/framework-0.1.0-SNAPSHOT.jar, http://geniverse.dev.concord.org/Geniverse-Experiments/Comet-streamhub/lib/frameworkview-0.1.0-SNAPSHOT2.jar",
    code: "org/concord/biologica/applet/PedigreeApplet.class"
  }),
  
  // sample view of inner pages
  innerTabView: SC.TabView.design({
    layout: {centerX: 0, centerY: 0, width: 500, height: 400  }, 
    items: [ 
      {title: "Page 1", value: "page1" },
      {title: "Page 2", value: "page2" } 
    ], 
    itemTitleKey: 'title', 
    itemValueKey: 'value', 
    nowShowing: 'page1' // defining the startup tab
  }),
  
  demos: SC.LabelView.design({
    escapeHTML: NO,
    value: "<h1>Welcome</h1><p>CC SproutCore component demos</p>",
    layout: { centerX: 0, centerY: 0, width: 500, height: 400 }
  }),
  
  page1: SC.LabelView.design({
    escapeHTML: NO,
    value: "<h1>Page 1</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>"
  }),
  
  page2: SC.LabelView.design({
    escapeHTML: NO,
    value: "<h1>Page 2</h1><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"
  }),

	question1View: CC.QuestionView.design({
		classNames: 'question1',
		prompt: "What do you think of this fine question?"
	}),
	
	question2View: CC.QuestionView.design({
		classNames: 'question2',
		prompt: "What do you think of this different fine question?<br/>This <span style='font-weight: bold;'>question</span> has <span style='font-style: oblique;'>styling</span>."
	})

});
