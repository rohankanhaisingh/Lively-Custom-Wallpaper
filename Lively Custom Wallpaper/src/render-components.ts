import { Circle, Vec2, Collection, TextNode } from "./libs/Stinky2D-master/index";

import { renderer, scene } from "./";
import { config } from "./config";

const meters: Collection<Circle> = new Collection<Circle>(),
	meterOutlines: Collection<Circle> = new Collection<Circle>(),
	meterAngle: number = -90;

const { baseRadius, padding, borderWidth } = config.meters;

export const secondsMeter: Circle = new Circle(0, 0, baseRadius + (padding * 3), 0, 360, false, {
	borderColor: "#fff",
	borderWidth,
	lineCap: "round"
});

export const minutesMeter: Circle = new Circle(0, 0, baseRadius + (padding * 2), 0, 360, false, {
	borderColor: "#fff",
	borderWidth,
	lineCap: "round"
});

export const hoursMeter: Circle = new Circle(0, 0, baseRadius + padding, 0, 360, false, {
	borderColor: "#fff",
	borderWidth,
	lineCap: "round"
});

export const centeredTimeText: TextNode = new TextNode("00:00:00", 0, 0, null, null, {
	textAlign: "center",
	font: "bold 30px Syne",
	textColor: "#fff"
});

export const centeredDayText: TextNode = new TextNode("Today", 0, 0, null, null, {
	textAlign: "center",
	font: "bolder 65px Syne",
	textColor: "#fff",
});

export const centeredDateText: TextNode = new TextNode("27-08-2023", 0, 0, null, null, {
	textAlign: "center",
	font: "bolder 35px Syne",
	textColor: "#fff",
});

export function colorMeters() {

	const { red, green, blue, alpha } = config.meters.strokeColor;
	const glow = config.meters.glow;

	meters.ForEach(function (meter: Circle, index: number) {

		const constructedColor: string = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

		meter.styles.borderColor = constructedColor;

		if (glow) {
			meter.styles.shadowBlur = 30;
			meter.styles.shadowColor = constructedColor;
		} else {
			meter.styles.shadowBlur = undefined;
			meter.styles.shadowColor = undefined;
		}
	});
}

export function setMetersPosition() {

	const { baseRadius, padding } = config.meters,
		sceneCenter: Vec2 = scene.Center();

	meters.ForEach(function (meter: Circle, index: number) {
		meter.radius = baseRadius + (padding * index);
	});

	meterOutlines.ForEach(function (meter: Circle, index: number) {
		meter.radius = baseRadius + (padding * index);
	});

	secondsMeter.SetPosition(sceneCenter.x, sceneCenter.y);
	minutesMeter.SetPosition(sceneCenter.x, sceneCenter.y);
	hoursMeter.SetPosition(sceneCenter.x, sceneCenter.y);
	centeredTimeText.SetPosition(sceneCenter.x, sceneCenter.y + 7);
	centeredDayText.SetPosition(sceneCenter.x, sceneCenter.y - (baseRadius + (padding * 2) + 100));
	centeredDateText.SetPosition(sceneCenter.x, sceneCenter.y + (baseRadius + (padding * 2) + 100));
}

export function setMetersBorderWidth(borderWidth: number) {

	meters.ForEach(meter => meter.styles.borderWidth = borderWidth);
	meterOutlines.ForEach(meter => meter.styles.borderWidth = borderWidth);
}

export function initializeRenderComponents() {

	setMetersPosition();

	meters.Add(secondsMeter).Add(minutesMeter).Add(hoursMeter);

	meters.ForEach(function (meter: Circle) {

		const meterOutline: Circle = new Circle(meter.x, meter.y, meter.radius, 0, 360, false, {
			borderColor: "#1a1a1a",
			borderWidth,
		});

		meterOutlines.Add(meterOutline);
		renderer.Add(meterOutline);
	});

	renderer.Add(secondsMeter);
	renderer.Add(minutesMeter);
	renderer.Add(hoursMeter);

	renderer.Add(centeredTimeText);
	renderer.Add(centeredDayText);
	renderer.Add(centeredDateText);

	secondsMeter.rotation = meterAngle;
	minutesMeter.rotation = meterAngle;
	hoursMeter.rotation = meterAngle;

	colorMeters();
}