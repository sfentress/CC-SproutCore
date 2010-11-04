// ==========================================================================
// Project:   CC.SensorAppletView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CC */

/** @class

  (Document Your View Here)

  @extends CC.AppletView
*/
CC.SensorAppletView = CC.AppletView.extend(
/** @scope CC.SensorAppletView.prototype */ {
	
	//OVERRIDES!!! These are typically overridden in the page definitions
	// This is the Javascript object path to the listener function... eg App.mainPage.mainPane.sensorApplet.sensorListener
	listenerPath: 'defaultDataListener',
	
	// the Javascript object path to the sensorState variable, which needs to be used under safari to trigger starting and stopping the sensors
	safariSensorStatePath: null,
	
	// these need to be overridden when implemented, if you want to use this view as the data listener
	// called whenever data is received in the sensor. dataPoints is an array of floats
	dataRecieved: function(dataType, numberOfDataPoints, dataPoints) {},
	
	// called whenever meta data about the data stream changes
	dataStreamEvent: function(dataType, numberOfDataPoints, dataPoints) {},
	
	// called when the applet is done initializing itself, and the sensors are ready to be used
	sensorsReady: function() {},
	
	// END OVERRIDES!!!
	
	// Using the sensor-applets jnlp system the following probe otml resources are 
	// currently available in the sensor-applets.jar:
	//
	//   /distance.otml
	//   /temperature.otml
	//   light.otml
	resourcePath: '/distance.otml',
	
	isSafari: function() {
		// detect safari
		if (typeof(navigator) != 'undefined' && typeof(navigator.vendor) != 'undefined' && navigator.vendor.indexOf("Apple") != -1) {
			return YES;
		}
		return NO;
	}(),
	
	// this is the javascript object patch to a String variable which will store the current sensor applet's state: "ready", "running", "stopped"
	sensorStatePath: function() {
		if (this.get('isSafari')) {
			return this.get('safariSensorStatePath');
		}
		return null;
	}.property('isSafari', 'safariSensorStatePath'),
	// the current sensor applet's state: "ready", "running", "stopped". If sensorStatePath is set, the applet will watch this variable for changes to trigger
	// starting and stopping the sensors. This is necessary on Safari on Mac OSX since the javascript can sometimes not call applet methods directly.
	sensorState: "ready",

	params: function() {    // adds cml url as the param to the mw applet
		var params = [
			'<param name="resource" value="' + this.get('resourcePath') + '" />',
			'<param name="listenerPath" value="' + this.get('listenerPath') + '" />',
			'<param name="name" value="' + this.get('appletId') + '" />'
		];
		if (this.get('sensorStatePath') !== null) {
			params.pushObject('<param name="sensorStatePath" value="' + this.get('sensorStatePath') + '" />');
		}
		return params.join("");
	}.property('resourcePath'),
	
	jarUrls: ['org/concord/sensor-native/sensor-native.jar',
           'org/concord/otrunk/otrunk.jar',
           'org/concord/framework/framework.jar',
           'org/concord/frameworkview/frameworkview.jar',
           'jug/jug/jug.jar',
           'jdom/jdom/jdom.jar',
           'org/concord/sensor/sensor.jar',
           'org/concord/data/data.jar',
           'org/concord/sensor/sensor-applets/sensor-applets.jar' ].join(', '),
	
	codebase: '/jnlp',
  
	code: 'org.concord.sensor.applet.OTSensorApplet',
	
	width: 160,
	height: 40,
	
	classNames: "sensor-applet",
	
	layout: { centerX: 0, centerY: 0, width: 160, height: 40 },     // defaults
	
	start: function() {
		this.set('sensorState', 'running');
		if (this.get('isSafari') == NO || this.get('sensorStatePath') === null) {
			this.run(function(applet) { applet.startCollecting(); });
		}
	},
	
	stop: function() {
		this.set('sensorState', 'stopped');
		if (this.get('isSafari') == NO || this.get('sensorStatePath') === null) {
			this.run(function(applet) { applet.stopCollecting(); });
		}
	},
	
	reset: function() {
		this.set('sensorState', 'ready');
		if (this.get('isSafari') == NO || this.get('sensorStatePath') === null) {
			this.run(function(applet) { applet.stopCollecting(); });
		}
	}

});
