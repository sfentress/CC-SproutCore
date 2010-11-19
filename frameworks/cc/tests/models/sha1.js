// ==========================================================================
// Project:   Sha1 Unit Test
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Geniverse module test ok equals same stop start */

//
// TODO:  Not sure how to create a directory for testing named 'lib' -- 
// seems like a good idea.
module("SHA-1");
sc_require('lib/sha1');

test("test SHA-1 implementation internally consistant", function() {
  var password1 = "test";
  var password2 = "test";
  var password3 = "testxy";
  
  var password1hash = HEX_SHA1(password1);
  var password2hash = HEX_SHA1(password2);
  var password3hash = HEX_SHA1(password3);
  
  equals(password1hash, password2hash, "SHA-1 hash of 'test' should equal SHA-1 hash of 'test'");
  ok(password1hash !== password3hash, "SHA-1 hash of 'test' should not equal SHA-1 hash of 'testxy'");
});

test("test SHA-1 implementation accurate", function() {
  var password1 = "";
  var password2 = "The quick brown fox jumps over the lazy dog";
  
  var password1hash = HEX_SHA1(password1);
  var password2hash = HEX_SHA1(password2);
  
  equals(password1hash, "da39a3ee5e6b4b0d3255bfef95601890afd80709", "SHA-1 hash of '' should equal known SHA-1 result");
  equals(password2hash, "2fd4e1c67a2d28fced849ee1bb76e7391b93eb12", "SHA-1 hash of 'The quick brown fox jumps over the lazy dog' should equal known SHA-1 result");
});



