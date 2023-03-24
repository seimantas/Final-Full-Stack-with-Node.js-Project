import express from "express";
import cors from "cors";

import usersController from "./src/services/users.js";
import eventController from "./src/services/events.js";
import adminRegisterController from "./src/services/admiRegister.js";
import adminLoginController from "./src/services/adminLogin.js";

import { isLoggedIn } from "./src/middleware/isloggedin.js";
import { LOCAL_PORT } from "./config.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/events", isLoggedIn, eventController);
app.use("/users", isLoggedIn, usersController);
app.use("/registration", adminRegisterController);
app.use("/login", adminLoginController);

app.listen(LOCAL_PORT, () => {
  console.log(`Server running on port ${LOCAL_PORT}`);
});
