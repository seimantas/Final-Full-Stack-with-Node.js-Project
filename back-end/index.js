import express from "express";
import cors from "cors";
import { LOCAL_PORT } from "./src/config";
import users from "./src/services/users";
import eventController from "./src/controllers/eventController";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/events", eventController);
app.use(users);

app.listen(LOCAL_PORT, () => {
  console.log(`Server running on port ${LOCAL_PORT}`);
});
