import React, { createContext } from "react";
import ReactDOM from "react-dom";
import io from "socket.io-client";
import * as serviceWorker from "./serviceWorker";

import { App } from "./App";
import "./index.scss";

const { REACT_APP_SERVER_HOST } = process.env;
const socket = io(REACT_APP_SERVER_HOST);

export const { Provider: SocketContextProvider, Consumer: SocketContextConsumer } = createContext();

ReactDOM.render(
	<SocketContextProvider value={socket}>
		<App />
	</SocketContextProvider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
