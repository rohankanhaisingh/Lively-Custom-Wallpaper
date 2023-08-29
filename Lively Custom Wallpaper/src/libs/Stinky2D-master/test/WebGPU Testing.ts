/// <reference types="@webgpu/types" />

import { fail } from "assert";
import { } from "..";

(async function () {

	// Request GPU adapter.
	const adapter: GPUAdapter | null = await navigator.gpu.requestAdapter();
	if (adapter === null) throw new Error("Adapter not found.");

	// Request device on adapter.
	const device: GPUDevice = await adapter.requestDevice();
	if (!device) throw new Error("Device not found.");

	// Get canvas element.
	const canvas: HTMLCanvasElement | null = document.querySelector("#renderer");
	if (canvas === null) throw new Error("Canvas not found");

	// Request GPU canvas context.
	const ctx: GPUCanvasContext | null = canvas.getContext("webgpu");
	if (ctx === null) throw new Error("Context not succesfully set.");

	// Request preferred canvas format.
	const presentationFormat: GPUTextureFormat = navigator.gpu.getPreferredCanvasFormat();

	// Configure presentation format.
	ctx.configure({ device, format: presentationFormat });

	// Create shader module.
	const module = device.createShaderModule({
		code: `
		
			@vertex fn vertexShader(@builtin(vertex_index) vertexIndex: u32) -> @builtin(position) vec4f {
				
				let pos = array(
					vec2f( 0.0,  0.5),  // top center
					vec2f(-0.5, -0.5),  // bottom left
					vec2f( 0.5, -0.5)   // bottom right
				);

				 return vec4f(pos[vertexIndex], 0.0, 1.0);
			}

			@fragment fn fragmentShader() -> @location(0) vec4f {

				return vec4f(1.0, 0.0, 0.0, 1.0);
			}
		`
	})
})();