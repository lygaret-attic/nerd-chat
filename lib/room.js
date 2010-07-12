var events = require('events'),
	sys    = require('sys')

// @class Room
// @extends EventEmitter
//
// A room is the arbiter and proxy for messages from clients. A client sends
// messages to a room, and receives messages from one or more rooms. The room
// itself will also notify clients or important events, such as new clients 
// joining the room, or clients leaving.
//
// A room will fire the following events:
//
// @event clientJoin (username) 
//   when a new client joins the room
// @event clientPart (username) 
//   when a client parts from the room
// @event clientMessage (username, formattedMessage) 
//   when a client sends a message to the room. the message is formatted 
//   according to the options the room was created with, defaulting to 
//   <span class={type}>{message}</span>

function Room(name, options) {
	this.name = name;
	this.options = options;
	this.participants = {};
}

Room.prototype = new events.EventEmitter();

// a nerdrouter compatiple handler for join
Room.prototype.handleJoin = function(context) { sys.print("joined!"); };

// a nerdrouter compatible handler for parting
Room.prototype.handlePart = function(context) { sys.print("parted!"); };

// a nerdrouter compatible handler for putting a message
Room.prototype.handleMessage = function(context) { sys.print("message!"); };


// ----------------------------------------------------------------------------
exports.Room = Room;
