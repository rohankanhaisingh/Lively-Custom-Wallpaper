import { Configuration } from "./typings";

export const config: Configuration = {
	rendering: {
		framerate: 60
	},
	meters: {
		borderWidth: 3,
		baseRadius: 100,
		padding: 30,
		strokeColor: {
			red: 255,
			green: 255,
			blue: 255,
			alpha: 1
		},
		glow: false
	},
	camera: {
		cameraSmoothing: 5,
		cameraPullDistance: 40
	}
};