import { Router } from "express";
import { MongoClient } from "mongodb";
import { MONGODB_URI } from "../../config.js";

const client = new MongoClient(MONGODB_URI);

const eventController = Router();

eventController.get("/", async (_, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("eventsManagerDB")
      .collection("events")
      .find()
      .toArray();
    await con.close();
    return res.send(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default eventController;
