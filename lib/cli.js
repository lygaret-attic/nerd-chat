#!/bin/env node

var Room       = require('nerdchat/room').Room,
    nerdrouter = require('nerdrouter'),
	routerxtra = require('nerdrouter/extras'),
	http       = require('http'),
	url        = require('url'),
	_ 	       = require('underscore')._

var room = new Room("nerds", {});

var router = nerdrouter.route({

	'get /join'    : _.bind(Room.prototype.handleJoin, room),

	'get /part'    : _.bind(Room.prototype.handlePart, room),

	'put /message' : _.bind(Room.prototype.handleMessage, room),

	'get *'        : routerxtra.handle404

});

routerxtra.createServer(router).listen(8567);
