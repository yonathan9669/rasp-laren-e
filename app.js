"use strict";

var Cylon = require("cylon");

Cylon.api({
	host: "0.0.0.0",
	port: "8080"
});

Cylon.robot({
	name: 'motorcito',

	connections: {
		raspi: {adaptor: "raspi", port: "/dev/ttyACM0"}
	},

	devices: {
		motor: {driver: 'motor', pin: 3}
	},

	work: function(my) {
		every((3).seconds(), function() {
			console.log('Motor Speed:' + my.motor.currentSpeed());
		})
	},

	toggleMotor: function(my) {
		my.motor.toggle();
	}

});

Cylon.start();