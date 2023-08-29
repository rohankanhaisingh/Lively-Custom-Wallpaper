import { config } from "./config";
import { FixedHexToRgbArray } from "./libs/Stinky2D-master";
import { colorMeters, setMetersBorderWidth, setMetersPosition } from "./render-components";

function isNumber(val: any): boolean {
    return typeof val === "number";
}

function isString(val: any): boolean {
    return typeof val === "string";
}

function isBoolean(val: any): boolean {
    return typeof val === "boolean";
}

function livelyPropertyListener(name: string, val: any) {
    switch (name) {
        case "framerate":

            if (isNumber(val)) config.rendering.framerate = val;
            break;
        case "meterBorderWidth":
            if (isNumber(val)) {

                config.meters.borderWidth = val;
                setMetersBorderWidth(val);
            }
            break;
        case "meterBaseRadius":
            if (isNumber(val)) {

                config.meters.baseRadius = val;
                setMetersPosition();
            }
            break;
        case "meterPadding":
            if (isNumber(val)) {

                config.meters.padding = val;
                setMetersPosition();
            }
            break;
        case "strokeColor":

            if (isString(val)) {

                const rgbColor: number[] | null = FixedHexToRgbArray(val);

                if (rgbColor === null) return;

                config.meters.strokeColor.red = rgbColor[0];
                config.meters.strokeColor.green = rgbColor[1];
                config.meters.strokeColor.blue = rgbColor[2];

                colorMeters();
            }
            break;
        case "meterGlow":

            if (isBoolean(val)) {

                config.meters.glow = val;
                colorMeters();
            }
            break;
        case "cameraSmoothing":

            if (isNumber(val)) config.camera.cameraSmoothing = val;
            break;
        case "cameraPullDistance":

            if (isNumber(val)) config.camera.cameraPullDistance = val;
            break;
    }
}

window.livelyPropertyListener = livelyPropertyListener;