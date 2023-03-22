import express from "express";
import cors from "cors";
import { LOCAL_PORT } from "./src/config";
import events from "./src/services/events";
import users from "./src/services/users";

const app = express();

app.use(express.json());
app.use(cors());

app.use(events);
app.use(users);

app.listen(LOCAL_PORT, () => {
  console.log(`Server running on port ${LOCAL_PORT}`);
});
