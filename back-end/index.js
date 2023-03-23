import express from "express";
import cors from "cors";
import { LOCAL_PORT } from "./config.js";
import usersController from "./src/services/users.js";
import eventController from "./src/services/events.js";
import adminRegisterController from "./src/services/admiRegister.js";
import adminLoginController from "./src/services/adminLogin.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/events", eventController);
app.use("/users", usersController);
app.use("/registration", adminRegisterController);
app.use("/login", adminLoginController);

app.listen(LOCAL_PORT, () => {
  console.log(`Server running on port ${LOCAL_PORT}`);
});
