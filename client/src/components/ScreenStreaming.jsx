import React, { useRef, useState } from "react";
import { Grid, Button } from "@material-ui/core";

import { getCaptureStream, stopCaptureStream } from "../utils/screenCapture.utils";
import "./ScreenStreaming.scss";

const FPS = 25;

export const ScreenStreaming = ({ socket }) => {
	const [captureStream, setCaptureStream] = useState(null);
	const [streamingIntervalId, setStreamingIntervalId] = useState(null);
	const videoRef = useRef();

	const getFrame = () => {
		const canvas = document.createElement("canvas");
		canvas.width = videoRef.current.videoWidth;
		canvas.height = videoRef.current.videoHeight;
		canvas.getContext("2d").drawImage(videoRef.current, 0, 0);

		return canvas.toDataURL("image/png");
	};

	const streamToNode = () => {
		setStreamingIntervalId(
			setInterval(() => {
				socket.emit("mediaStream", getFrame());
			}, 1000 / FPS)
		);
	};

	const startScreenStreaming = async () => {
		try {
			const stream = await getCaptureStream();

			setCaptureStream(stream);
			videoRef.current && (videoRef.current.srcObject = stream);
			streamToNode(stream);
		} catch (error) {
			console.log(error);
		}
	};

	const stopScreenStreaming = () => {
		clearInterval(streamingIntervalId);
		stopCaptureStream(captureStream);
	};

	return (
		<Grid container spacing={2} className="ScreenStreaming">
			<Grid className="ScreenStreaming__action-buttons" item xs={2}>
				<Button
					fullWidth
					onClick={startScreenStreaming}
					variant="contained"
					color="primary"
				>
					Start streaming
				</Button>
				<Button
					fullWidth
					onClick={stopScreenStreaming}
					variant="outlined"
					color="secondary"
				>
					Stop streaming
				</Button>
			</Grid>
			<Grid item xs={10}>
				<video className="ScreenStreaming__video" ref={videoRef} autoPlay />
			</Grid>
		</Grid>
	);
};
