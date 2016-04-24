var Cylon = require("cylon");

Cylon.robot({
	connections: {
		raspi: {adaptor: "raspi", port: "/dev/ttyACM0"}
	},

	devices: {
		led: {driver: "led", pin: 11}
	},

	work: function(my) {
		every((1).seconds(), my.led.toggle);
	}
}).start();