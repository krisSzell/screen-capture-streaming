import React, { useRef, useState } from "react";
import { Grid, Button } from "@material-ui/core";

import { getCaptureStream, stopCaptureStream } from "../utils/screenCapture.utils";
import "./ScreenStreaming.scss";

export const ScreenStreaming = ({ socket }) => {
	const [captureStream, setCaptureStream] = useState(null);
	const videoRef = useRef();

	const startScreenStreaming = async () => {
		try {
			const stream = await getCaptureStream();

			setCaptureStream(stream);
			videoRef.current && (videoRef.current.srcObject = stream);
		} catch (error) {
			console.log(error);
		}
	};

	const stopScreenStreaming = () => stopCaptureStream(captureStream);

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
