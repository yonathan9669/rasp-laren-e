var Cylon = require("cylon");

Cylon.api("http", {
	ssl: false,
	host: "0.0.0.0",
	port: "8080",
	serveDir: __dirname + '/web'
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
		this._setDirection(this.motorF, this.motorB, 'Engine', 'Forward');

		return this.motorF;
	},

	goBackward: function() {
		this._setDirection(this.motorB, this.motorF, 'Engine', 'Backward');

		return this.motorB;
	},

	stopMotor: function() {
		this._stop(this.motorF, this.motorB, 'Engine');
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
		this._stop(this.directionL, this.directionR, 'Direction');
	},

	//Private Options
	_setDirection: function(on, off, name, going) {
		try {
			off.turnOff();
			on.turnOn();

			console.log(name + ' going ' + going + ': ' + on.currentSpeed());
		}
		catch (ex) {
			console.error(ex);
		}
	},

	_stop: function(one, two, name) {
		try {
			one.turnOff();
			two.turnOff();

			console.log(name + ' STOP');
		}
		catch (ex) {
			console.error(ex);
		}
	}
});

Cylon.start();