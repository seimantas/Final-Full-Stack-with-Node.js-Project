import express from "express";
import { LOCAL_PORT } from "./src/config";
import { MongoClient } from "mongodb";
import { MONGODB_URI } from "./src/config";

const client = new MongoClient(MONGODB_URI);

const app = express();

app.use(express.json());

app.listen(LOCAL_PORT, () => {
  console.log(`Server running on port ${LOCAL_PORT}`);
});
