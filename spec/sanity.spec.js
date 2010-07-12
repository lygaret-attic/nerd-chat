var vows    = require('vows'),
    assert  = require('assert');

vows.describe("basic sanity tests").addBatch({

	"a basic sanity test": {
		topic: function() { return true },

		"should pass": function(value) { 
			assert.isTrue(value)
		}
	},

	"the library": {
		topic: function() { return require('nerdchat') },

		"should exist": function(chat) {
			assert.isNotNull(chat)
		},

		"should export a 'VERSION' identifier": function(chat) {
			assert.notEqual(typeof chat.VERSION, "undefined")
			assert.isNotNull(chat.VERSION)
		}
	}

}).export(module)
