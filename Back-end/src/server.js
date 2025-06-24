const express = require("express");
const Controller = require("./controller");
const cors = require("cors");

const server = express();
const PORT = 8080;

server.use(cors());
server.use(express.json());

server.get("/brownies", Controller.getAllBrownies);
server.get("/brownie/:id", Controller.getBrownieByID);
server.post("/payments", Controller.setPayment);

server.get("/history", Controller.getAllHistory);
server.post("/order", Controller.setOrder);

server.listen(PORT, () => console.log("Server ON"));
