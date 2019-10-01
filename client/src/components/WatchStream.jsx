import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";

import "./WatchStream.scss";

export const WatchStream = ({ socket }) => {
	const [streamSrc, setStreamSrc] = useState("");

	useEffect(() => {
		socket.on("mediaStreamReceive", data => {
			setStreamSrc(data);
		});
	}, []);

	return (
		<Grid container spacing={2} className="WatchStream">
			<Grid item xs={12}>
				<img className="WatchStream__image" src={streamSrc || ""} />
			</Grid>
		</Grid>
	);
};
