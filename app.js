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
		motorF: {driver: 'motor', pin: 29},
		motorB: {driver: 'motor', pin: 31},
		directionL: {driver: 'motor', pin: 18},
		directionR: {driver: 'motor', pin: 22}
	},

	work: function() {
	},

	//Engine Options
	goForward: function() {
		this._setDirection(this.motorF, this.motorB, 'Motor', 'Forward');

		return this.motorF;
	},

	goBackward: function() {
		this._setDirection(this.motorB, this.motorF, 'Motor', 'Backward');

		return this.motorB;
	},

	stopMotor: function() {
		this._stop(this.motorF, this.motorB);
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
		this._setDirection(this.directionL, this.directionR, 'Direction', 'Left');

		return this.directionL;
	},

	goRight: function() {
		this._setDirection(this.directionR, this.directionL, 'Direction', 'Right');

		return this.directionR;
	},

	stopDirection: function() {
		this._stop(this.directionL, this.directionR);
	},

	toggleDirection: function() {
		this.directionL.toggle();
		this.directionR.toggle();

		console.log('Direction Left:' + this.directionL.currentSpeed());
		console.log('Direction Right:' + this.directionR.currentSpeed());

		return {left: this.directionL, right: this.directionR};
	},

	//Private Options
	_setDirection: function(on, off, name, going) {
		off.turnOff();
		on.turnOn();

		console.log(name + ' going ' + going + ': ' + on.currentSpeed());
	},

	_stop: function(one, two) {
		one.turnOff();
		two.turnOff();
	}
});

Cylon.start();