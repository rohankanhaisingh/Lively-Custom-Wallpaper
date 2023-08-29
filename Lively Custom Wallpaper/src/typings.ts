export interface RGBAColorCombination {
	red: number;
	green: number;
	blue: number;
	alpha: number;
}

export interface MeterConfiguration {
	borderWidth: number;
	baseRadius: number;
	padding: number;
	strokeColor: RGBAColorCombination;
	glow: boolean;
}

export interface CameraConfiguration {
	cameraSmoothing: number;
	cameraPullDistance: number;
}

export interface RenderingConfiguration {
	framerate: number;
}

export interface Configuration {
	meters: MeterConfiguration;
	camera: CameraConfiguration;
	rendering: RenderingConfiguration;
}

declare global {
	interface Window {
		livelyPropertyListener: (name: string, val: any) => void;
	}
}