import "dotenv/config";
import express from "express";
import { Server } from "http";
import socket from "socket.io";

const { PORT } = process.env;

const app = express();
const server = new Server(app);
const io = socket(server);

server.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}...`);
});

io.on("connection", socket => {
	console.log("Client connected: ");
	console.dir(socket.request.headers);
	socket.emit("connected", "Connection established successfully!");

	socket.on("mediaStream", dataChunk => {
		console.log("Received data chunk: ", dataChunk);
	});
});
