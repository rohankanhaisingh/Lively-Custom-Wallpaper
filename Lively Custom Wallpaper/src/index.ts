import { Scene, Renderer, Camera, Looper, Vec2, Rectangle, RandomIntBetween, AnimateInteger, WaitFor } from "./libs/Stinky2D-master/index";

import { animateMeters, render } from "./rendering";
import { initializeRenderComponents } from "./render-components";
import "./lively-event-listeners";

export const scene: Scene = new Scene(innerWidth, innerHeight, document.querySelector(".scene") as HTMLDivElement, ["keepSizeToWindow", "disableContextMenu"]);
export const renderer: Renderer = new Renderer(scene, { willReadFrequently: true });
export const camera: Camera = new Camera(renderer, scene);
export const looper: Looper = new Looper();

async function animateBackgroundSquares(square: Rectangle) {

	const randomPosition: Vec2 = scene.GetRandomPosition(),
		randomSize: number = RandomIntBetween(5, 100),
		randomDuration: number = RandomIntBetween(10, 100) * 100,
		randomRotationAngle: number = RandomIntBetween(0, 360);

	square.SetPosition(randomPosition.x, randomPosition.y);
	square.rotation = 0;

	AnimateInteger(0, randomSize, "easeOutBack", randomDuration, size => square.SetSize(new Vec2(size, size)));

	await WaitFor(randomDuration + 1000);

	AnimateInteger(0, randomRotationAngle, "easeOutBack", randomDuration, rotation => square.rotation = rotation);

	await WaitFor(randomDuration + 1000);

	AnimateInteger(randomSize, 0, "easeOutBack", randomDuration, size => square.SetSize(new Vec2(size, size)));

	await WaitFor(randomDuration + 1000);

	animateBackgroundSquares(square);
}

function createBackgroundDesign() {

	for (let i = 0; i < 20; i++) {

		const square: Rectangle = new Rectangle(0, 0, 0, 0, {
			backgroundColor: "rgba(255, 255, 255, .1)"
		});

		square.AddEventListener("mouseEnter", function () {

			AnimateInteger(.3, .1, "easeOutExpo", 1000, shade => square.styles.backgroundColor = `rgba(255, 255, 255, ${shade})`);
		});

		renderer.Add(square);
		animateBackgroundSquares(square);
	}
}

function setup() {

	createBackgroundDesign();
	initializeRenderComponents();

	looper.Trigger();
}

looper.AddEventListener("update", render);
looper.AddEventListener("update", animateMeters);
window.addEventListener("load", setup);