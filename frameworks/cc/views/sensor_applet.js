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
	
	// TODO This only supports a Vernier GoMotion right now...
	resourcePath: '/simple.otml',
	
	// This is the Javascript object path to the listener function... eg App.mainPage.mainPane.sensorApplet.sensorListener
	listenerPath: 'defaultDataListener',
	
	appletName: "sensorApplet",

	params: function() {    // adds cml url as the param to the mw applet
		return [
			'<param name="resource" value="' + this.get('resourcePath') + '" />',
			'<param name="listenerPath" value="' + this.get('listenerPath') + '" />',
			'<param name="name" value="' + this.get('appletName') + '" />'
		].join("");
	}.property('resourcePath'),
	
	jarUrls: 'http://jnlp.concord.org/dev/org/concord/sensor/sensor-applets/sensor-applets.jar?version-id=0.1.0-20100526.144053-9, http://jnlp.concord.org/dev/org/concord/otrunk/otrunk.jar?version-id=0.2.0-20100519.081729-231, http://jnlp.concord.org/dev/org/concord/framework/framework.jar?version-id=0.1.0-20100518.155205-550, http://jnlp.concord.org/dev/org/concord/frameworkview/frameworkview.jar?version-id=0.1.0-20100518.160605-394, http://jnlp.concord.org/dev/org/concord/swing/swing.jar?version-id=0.1.0-20100518.155225-382, http://jnlp.concord.org/dev/jug/jug/jug.jar?version-id=1.1.2, http://jnlp.concord.org/dev/jdom/jdom/jdom.jar?version-id=1.0, http://jnlp.concord.org/dev/org/concord/apple-support/apple-support.jar?version-id=0.1.0-20100518.155355-314, http://jnlp.concord.org/dev/org/concord/utilities/response-cache/response-cache.jar?version-id=0.1.0-20100503.180141-215, http://jnlp.concord.org/dev/org/concord/sensor-native/sensor-native.jar?version-id=0.1.0-20100520.192620-460, http://jnlp.concord.org/dev/org/concord/sensor/sensor.jar?version-id=0.2.0-20100519.082617-265, http://jnlp.concord.org/dev/org/concord/data/data.jar?version-id=0.2.0-20100518.160532-268, http://jnlp.concord.org/dev/org/concord/external/rxtx/rxtx-comm/rxtx-comm.jar?version-id=2.1.7-r2',
	
	code: 'org.concord.sensor.applet.OTSensorApplet',
	
	width: 160,
	height: 40,
	
	classNames: "sensor-applet",
	
	layout: { centerX: 0, centerY: 0, width: 160, height: 40 }     // defaults

});
