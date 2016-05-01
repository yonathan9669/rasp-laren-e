var Cylon = require("cylon");

Cylon.api({
	host: "0.0.0.0",
	port: "8080"
});

Cylon.robot({
	name: 'raspLarenE',

	connections: {
		raspi: {adaptor: "raspi", port: "/dev/ttyACM0"}
	},

	devices: {
		motorF: {driver: 'motor', pin: 11},
		motorB: {driver: 'motor', pin: 15},
		directionL: {driver: 'motor', pin: 12},
		directionR: {driver: 'motor', pin: 16}
	},

	work: function(my) {
		my.motorF.turnOn();
		my.directionL.turnOn();

		every((5).seconds(function() {
			my.motorF.toggle();
			my.motorB.toggle();

			my.directionL.toggle();
			my.directionR.toggle();
		}));
	},

	toggleMotor: function(my) {
		this.motor.toggle(function(err, value) {
			if (err) console.error(err);

			console.log('Motor TOGGLE:' + value);
		});

		return my;
	}

});

Cylon.start();