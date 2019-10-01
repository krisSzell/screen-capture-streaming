import React, { useState } from "react";
import { Button, Grid } from "@material-ui/core";

import { recordScreenshot, toObjectURL } from "../utils/screenCapture.utils";
import "./Screenshot.scss";

export const Screenshot = () => {
	const [screenshotObjectURL, setScreenshotObjectURL] = useState("");

	const makeScreenshot = async () => {
		try {
			const screenshotBlob = await recordScreenshot();

			setScreenshotObjectURL(toObjectURL(screenshotBlob));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Grid container spacing={2} className="Screenshot">
			<Grid className="Screenshot__action-buttons" item xs={2}>
				<Button fullWidth onClick={makeScreenshot} variant="contained" color="primary">
					Make screenshot
				</Button>
			</Grid>
			<Grid item xs={10}>
				<img className="Screenshot__image" src={screenshotObjectURL || ""} />
			</Grid>
		</Grid>
	);
};
