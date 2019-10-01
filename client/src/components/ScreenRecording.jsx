import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";

import { toObjectURL, recordScreencast, stopScreenCapture } from "../utils/screenCapture.utils";
import "./ScreenRecording.scss";

export const ScreenRecording = () => {
	const [recordedVideoObjectURL, setRecordedVideoObjectURL] = useState("");
	const [captureStream, setCaptureStream] = useState(null);
	const [mediaRecorder, setMediaRecorder] = useState(null);

	const startScreenRecording = async () => {
		try {
			const { video, captureStream, mediaRecorder } = await recordScreencast();

			setCaptureStream(captureStream);
			setMediaRecorder(mediaRecorder);

			setRecordedVideoObjectURL(toObjectURL(await video));
		} catch (error) {
			console.log(error);
		}
	};

	const stopScreenRecording = () => stopScreenCapture(captureStream, mediaRecorder);

	return (
		<Grid container spacing={2} className="ScreenRecording">
			<Grid className="ScreenRecording__action-buttons" item xs={2}>
				<Button
					fullWidth
					onClick={startScreenRecording}
					variant="contained"
					color="primary"
				>
					Start recording
				</Button>
				<Button
					fullWidth
					onClick={stopScreenRecording}
					variant="outlined"
					color="secondary"
				>
					Stop recording
				</Button>
			</Grid>
			<Grid item xs={10}>
				<video
					className="ScreenRecording__video"
					src={recordedVideoObjectURL || ""}
					controls
				/>
			</Grid>
		</Grid>
	);
};
