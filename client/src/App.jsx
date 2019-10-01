import React, { useState } from "react";
import { Container, AppBar, Tabs, Tab, Box } from "@material-ui/core";

import { ScreenStreaming } from "./components/ScreenStreaming";
import { ScreenRecording } from "./components/ScreenRecording";
import { Screenshot } from "./components/Screenshot";
import { WatchStream } from "./components/WatchStream";
import { SocketContextConsumer } from ".";

import "./App.scss";

const a11yProps = index => ({
	id: `app-tab-${index}`,
	"aria-controls": `app-tabpanel-${index}`
});

const TabPanel = ({ children, value, index }) => (
	<Box
		component="div"
		role="tabpanel"
		hidden={value !== index}
		id={`app-tabpanel-${index}`}
		aria-labelledby={`app-tab-${index}`}
	>
		{children}
	</Box>
);

export const App = () => {
	const [activeTab, setActiveTab] = useState(0);

	const handleTabChange = (_, newTab) => setActiveTab(newTab);

	return (
		<div className="App">
			<AppBar className="App__bar">
				<Container className="App__bar-content">
					<Tabs
						value={activeTab}
						onChange={handleTabChange}
						centered
						aria-label="ScreenCapture showcase tabs"
					>
						<Tab label="Screen Streaming" {...a11yProps(0)} />
						<Tab label="Screen Recording" {...a11yProps(1)} />
						<Tab label="Screenshot" {...a11yProps(2)} />
						<Tab label="Watch stream" {...a11yProps(3)} />
					</Tabs>
				</Container>
			</AppBar>
			<Container className="App__body">
				<SocketContextConsumer>
					{socket => (
						<>
							<TabPanel value={activeTab} index={0}>
								<ScreenStreaming socket={socket} />
							</TabPanel>
							<TabPanel value={activeTab} index={1}>
								<ScreenRecording />
							</TabPanel>
							<TabPanel value={activeTab} index={2}>
								<Screenshot />
							</TabPanel>
							<TabPanel value={activeTab} index={3}>
								<WatchStream socket={socket} />
							</TabPanel>
						</>
					)}
				</SocketContextConsumer>
			</Container>
		</div>
	);
};
