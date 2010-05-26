// ==========================================================================
// Project:   CcChat.chatRoomController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
CcChat.chatRoomController = SC.ObjectController.create(
/** @scope CcChat.chatRoomController.prototype */ {
  
  channel: "",                  // the main channel that the user will chat in
  
  baseChannelName: function(){    // if channels are dynamically assigned, e.g. 'myRoom/1', this would be 'myRoom'
    return this.get('channel').split('/')[0];
  }.property('channel'),
  
  channelIndex:  function(){    // if channels are dynamically assigned, e.g. 'myRoom/1', this would be 1
    var channelNameParts = this.get('channel').split('/');
    if (channelNameParts.length > 1){
      return parseInt(channelNameParts[1], 10);
    } else {
      return 0;
    }
  }.property('channel'),
  
  /**
   * This method can be used to assign students to rooms with no more
   * than n students. For instance, if you want no more than two
   * students per room, and you call getFirstChannelWithSpace("myRoom", 2)
   * for each student. The first two calls will return "myRoom/0," and, if
   * those students subscribe to that channel, the third call will return
   * "myRoom-2."
   * Callback should be a function which takes a string (the room name).
   */
  getFirstChannelWithSpace: function (baseChannelName, maxClients, callback){
    (function(baseChannelName, maxClients, callback){
      baseChannelName = this.validateChannel(baseChannelName);
      var channelNameParts = baseChannelName.split('//');
      var baseName = channelNameParts[0];
      
      var nextNum = 0;
      if (channelNameParts.length > 1){
        var prevNum = parseInt(channelNameParts[1], 10);
        nextNum = prevNum + 1;
      }
      
      var newChannelName = baseName + "/" + nextNum;
      SC.Logger.log("newChannelName = "+newChannelName);
      
      function checkIfChannelHasSpace(numClients){
        if (numClients < maxClients){
          callback(newChannelName);
        } else {
          CcChat.chatRoomController.getFirstChannelWithSpace(newChannelName, maxClients, callback);
        }
      }
      
      CcChat.chatRoomController.getNumClientsInChannel(newChannelName, checkIfChannelHasSpace);
      
    })(baseChannelName, maxClients, callback);
  },
  
  /**
   * Callback should be a function that takes a number (the clients in the room).
   */
  getNumClientsInChannel: function(channel, callback){
    (function(channel, callback){
      function returnNumberOfClients(message){
        var numClients = [].concat(message);
        SC.Logger.log("clients in "+channel+": "+numClients);
        var comet = CcChat.chatController.comet;
        comet.unsubscribe('/smeta/clients'+channel);
                
        callback(numClients.length, channel);
      }
            
      var comet = CcChat.chatController.comet;
      comet.subscribe('/smeta/clients'+channel, returnNumberOfClients, this);
    })(channel, callback);
  },
    
  validateChannel: function(channel){
    if (channel.slice(0,1) != "/"){
      channel = "/"+channel;
    }
    return channel;
  }
  
}) ;
