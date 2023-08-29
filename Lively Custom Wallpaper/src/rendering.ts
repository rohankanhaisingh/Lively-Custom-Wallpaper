import { Vec2, CalculateAtan, Vector2, CalculateDistance } from "./libs/Stinky2D-master/index";

import { secondsMeter, minutesMeter, hoursMeter, centeredDateText, centeredDayText, centeredTimeText } from "./render-components";
import { scene, camera, renderer, looper } from "./";
import { config } from "./config";

const dayNames: string[] = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];

const cameraLook: Vec2 = new Vec2(0, 0),
	cameraPosition: Vec2 = new Vec2(0, 0);

let lastTimestamp: number = Date.now(), lastClockTick: number = Date.now();

export function animateMeters() {

	const now: number = Date.now();

	if (!(now > lastClockTick + 1000)) return;

	lastClockTick = now;

	const currentDate = new Date(),
		currentHour = currentDate.getHours(),
		currentMinute = currentDate.getMinutes(),
		currentSecond = currentDate.getSeconds();

	const secondRadian: number = 360 / 60 * currentSecond,
		minuteRadian: number = 360 / 60 * currentMinute,
		hourRadian: number = 360 / 24 * currentHour;

	secondsMeter.AnimateCurrentEndAngle(secondRadian, "easeOutExpo", 1000);
	minutesMeter.AnimateCurrentEndAngle(minuteRadian, "easeOutExpo", 1000);
	hoursMeter.AnimateCurrentEndAngle(hourRadian, "easeOutExpo", 1000);

	updateText();
	return;
}

export function updateText() {

	const currentDate = new Date(),
		currentHour = currentDate.getHours(),
		currentMinute = currentDate.getMinutes(),
		currentSecond = currentDate.getSeconds();

	const fixedSecondString: string = currentSecond.toString().length === 1 ? "0" + currentSecond : currentSecond.toString(),
		fixedMinuteString: string = currentMinute.toString().length === 1 ? "0" + currentMinute : currentMinute.toString(),
		fixedHourString: string = currentHour.toString().length === 1 ? "0" + currentHour : currentHour.toString();

	const currentDateNumber: number = currentDate.getDate(),
		currentMonthNumber: number = currentDate.getMonth(),
		currentYearNumber: number = currentDate.getFullYear();

	centeredTimeText.text = `${fixedHourString}:${fixedMinuteString}:${fixedSecondString}`;
	centeredDayText.text = `${dayNames[currentDate.getDay()]}`;
	centeredDateText.text = `${currentDateNumber}-${currentMonthNumber + 1}-${currentYearNumber}`;
}

export function animateCamera() {

	const { cameraSmoothing, cameraPullDistance } = config.camera

	const sceneCenter: Vector2 = {
		x: scene.width / 2,
		y: scene.height / 2
	};

	const distance: number = CalculateDistance(sceneCenter.x, sceneCenter.y, scene.mouse.x, scene.mouse.y);
	const fixedDistance: number = cameraPullDistance / (scene.width / 2) * distance;
	const polarDirection: Vector2 = CalculateAtan(sceneCenter.x, sceneCenter.y, scene.mouse.x, scene.mouse.y).multiply(fixedDistance);

	cameraPosition.x = sceneCenter.x - polarDirection.x;
	cameraPosition.y = sceneCenter.y - polarDirection.y;

	cameraLook.x += ((cameraPosition.x - cameraLook.x) / cameraSmoothing) * looper.deltaTime;
	cameraLook.y += ((cameraPosition.y - cameraLook.y) / cameraSmoothing) * looper.deltaTime;

	camera.x = -((scene.width / 2) - (cameraLook.x));
	camera.y = -((scene.height / 2) - (cameraLook.y));

}

export function render() {

	const now: number = Date.now(),
		frameRate: number = config.rendering.framerate;

	if (!(now > lastTimestamp + (1000 / frameRate))) return;

	lastTimestamp = now;

	renderer.ClearScene();
	renderer.PaintScene("#121212");
	renderer.RenderObjectsInCamera(looper.deltaTime);

	animateCamera();

	return;
}