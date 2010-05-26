// ==========================================================================
// Project:   CcChat.chatRoomController Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat module test ok equals same stop start */

module("CcChat.chatRoomController");

// TODO: Replace with real unit test for CcChat.chatRoomController
test("test description", function() {
  CcChat.chatRoomController.set('channel', 'myRoom/2');
  
  var base = CcChat.chatRoomController.get('baseChannelName');
  equals(base, 'myRoom', "base should equal myRoom");
  
  
  var index = CcChat.chatRoomController.get('channelIndex');
  equals(index, 2, "index should equal 2");
});

