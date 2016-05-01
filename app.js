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
		motorF: {driver: 'led', pin: 29},
		motorB: {driver: 'led', pin: 31},
		directionL: {driver: 'led', pin: 18},
		directionR: {driver: 'led', pin: 22}
	},

	work: function(my) {
		var i = 0;
		my.motorF.turnOn();
		my.directionL.turnOn();
	},

	toggleMotor: function() {
		this.motorF.toggle();
		this.motorB.toggle();

		console.log('Motor Forward:' + this.motorF.currentBrightness());
		console.log('Motor Backward:' + this.motorB.currentBrightness());

		return {forward: this.motorF, backward: this.motorB};
	},

	toggleDirection: function() {
		this.directionL.toggle();
		this.directionR.toggle();

		console.log('Direction Left:' + this.directionL.currentBrightness());
		console.log('Direction Right:' + this.directionR.currentBrightness());

		return {left: this.directionL, right: this.directionR};
	}
});

Cylon.start();