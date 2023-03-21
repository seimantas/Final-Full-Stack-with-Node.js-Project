import express from "express";
import { LOCAL_PORT } from "./src/config";
import { MongoClient } from "mongodb";

const UIR = "mongodb://localhost:27017";
const client = new MongoClient(UIR);

const app = express();

app.use(express.json());

app.listen(LOCAL_PORT, () => {
  console.log(`Server running on port ${LOCAL_PORT}`);
});
