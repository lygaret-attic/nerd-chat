General Flow
============

The idea is that each client will connect to a specific end point and listen
for events to be triggered on that particular end point, per-client. So, here
is the concept of a flow:

  1. A client joins by GETting a session key from a well-known location, which
     is behind an http basic auth wall, and https. If the user is not registered,
	 then the password section of the authentication header will be blank. In this
	 case, the user will be kicked out if the name is reserved, or if it is in use.
	 Otherwise, it is seen as an attempt to login, and the user will be logged in
	 depending on the success of the password.

  2. The join response indicates success or failure.
    a. on a failed join attempt, the response will include a reason for failure
	   (likely, the username is reserved, or the password was incorrect, etc.)
	b. on a successful join attempt, the response will include a session key, a
	   url for the clients specific notification channel and a list of the last
	   25 messages in the room.

  3. Assuming successful join, the client then starts to long-pool the notifcation
     url, which is client and room specific, again including the basic auth headers.

  4. The client sends a message, which is PUTted to the rooms well known location for
     putting messages. Every participant is notified of the message through an event,
	 and forwards the message down the notification channel.

  5. When the notification channel recieves a message, it closes, and the client reopens
     it, as soon as it can. Any messages will be queued for up to 5 minutes while waiting
	 for the client to reconnect; if the client does not reconnect within five minutes,
	 its assumed that the client has disconnected, and the client will be logged off.

