var Cylon = require("cylon");
var self = this;

//Private Options
var _setDirection = function(on, off, name, going) {
	off.turnOff();
	on.turnOn();

	console.log(name + ' going ' + going + ': ' + on.currentSpeed());
};

var _stop = function(one, two) {
	one.turnOff();
	two.turnOff();
};

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
		motorF: {driver: 'motor', pin: 29},
		motorB: {driver: 'motor', pin: 31},
		directionL: {driver: 'motor', pin: 18},
		directionR: {driver: 'motor', pin: 22}
	},

	work: function() {
	},

	//Engine Options
	goForward: function() {
		self._setDirection(this.motorF, this.motorB, 'Motor', 'Forward');

		return this.motorF;
	},

	goBackward: function() {
		self._setDirection(this.motorB, this.motorF, 'Motor', 'Backward');

		return this.motorB;
	},

	stopMotor: function() {
		self._stop(this.motorF, this.motorB);
	},

	toggleMotor: function() {
		this.motorF.toggle();
		this.motorB.toggle();

		console.log('Motor Forward:' + this.motorF.currentSpeed());
		console.log('Motor Backward:' + this.motorB.currentSpeed());

		return {forward: this.motorF, backward: this.motorB};
	},

	//Direction Options
	goLeft: function() {
		self._setDirection(this.directionL, this.directionR, 'Direction', 'Left');

		return this.directionL;
	},

	goRight: function() {
		self._setDirection(this.directionR, this.directionL, 'Direction', 'Right');

		return this.directionR;
	},

	stopDirection: function() {
		self._stop(this.directionL, this.directionR);
	},

	toggleDirection: function() {
		this.directionL.toggle();
		this.directionR.toggle();

		console.log('Direction Left:' + this.directionL.currentSpeed());
		console.log('Direction Right:' + this.directionR.currentSpeed());

		return {left: this.directionL, right: this.directionR};
	}
});

Cylon.start();