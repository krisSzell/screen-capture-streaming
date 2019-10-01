import uuidv4 from "uuid/v4";
import { isChrome, isFirefox } from "./browserDetection.utils";

export const SUPPORTS_SCREEN_CAPTURE_API = () =>
	(isChrome() || isFirefox()) && !!navigator.mediaDevices;

const DISPLAY_MEDIA_OPTIONS = {
	video: {
		cursor: "always"
	},
	audio: false
};

const _drawToCanvas = video => {
	const canvas = document.createElement("canvas");
	video.width = canvas.width = video.videoWidth;
	video.height = canvas.height = video.videoHeight;
	canvas.getContext("2d").drawImage(video, 0, 0);

	video.srcObject.getTracks().forEach(track => track.stop());
	video.srcObject = null;

	return canvas;
};

export const stopScreenCapture = (captureStream, mediaRecorder) => {
	debugger;
	mediaRecorder && mediaRecorder.stop();
	captureStream && captureStream.getTracks().forEach(track => track.stop());
};

const _screenShotToCanvas = async () => {
	let captureStream = null;

	captureStream = await navigator.mediaDevices.getDisplayMedia(DISPLAY_MEDIA_OPTIONS);

	if (!captureStream) {
		return;
	}

	const video = document.createElement("video");
	video.srcObject = captureStream;
	video.play();

	return new Promise(resolve => {
		// setting timeout to prevent from screenshoting Screen Capture prompt
		setTimeout(
			() =>
				video.addEventListener(
					"timeupdate",
					() => {
						const canvas = _drawToCanvas(video);
						resolve(canvas);
					},
					{ once: true }
				),
			300
		);
	});
};

export const recordScreenshot = async containerEventHandlers =>
	new Promise(async resolve =>
		(await _screenShotToCanvas(containerEventHandlers)).toBlob(resolve)
	);

export const getCaptureStream = async () =>
	navigator.mediaDevices.getDisplayMedia(DISPLAY_MEDIA_OPTIONS);

export const stopCaptureStream = stream => stream.getTracks().forEach(track => track.stop());

export const recordScreencast = async () => {
	try {
		let captureStream = null;
		const chunks = [];

		captureStream = await getCaptureStream();

		if (!captureStream) {
			return;
		}

		const mediaRecorder = new MediaRecorder(captureStream, { mimeType: "video/webm" });
		mediaRecorder.start();

		captureStream.getTracks()[0].onended = () => {
			mediaRecorder !== "inactive" && mediaRecorder.stop();
		};

		mediaRecorder.ondataavailable = event => chunks.push(event.data);

		return {
			video: new Promise(resolve => {
				mediaRecorder.onstop = () => {
					resolve(new Blob(chunks, { type: "video/webm" }));
				};
			}),
			captureStream,
			mediaRecorder
		};
	} catch (error) {
		console.log(error);
	}
};

export const cleanObjectURL = object => URL.revokeObjectURL(object);

export const toObjectURL = object => URL.createObjectURL(object);

export const toReduxStoreable = (object, asDataURL = false) => ({
	id: object.id || uuidv4(),
	value: asDataURL ? object.value : toObjectURL(object),
	name: object.name || "",
	type: object.type,
	asDataURL
});

export const toBlob = async reduxObject => await fetch(reduxObject.value).then(res => res.blob());
