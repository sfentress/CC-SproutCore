# ===========================================================================
# Project:   CcSproutcore
# Copyright: ©2010 My Company, Inc.
# ===========================================================================

# Add initial buildfile information here
config :all, :required => [:sproutcore, :cc, :cc_chat]
proxy '/chat/', :to => 'geniverse.dev.concord.org'