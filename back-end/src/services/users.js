import { Router } from "express";
import { MongoClient } from "mongodb";
import { MONGODB_URI } from "../../config.js";

const usersController = Router();

const client = new MongoClient(MONGODB_URI);

usersController.get("/", async (_, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("eventsManagerDB")
      .collection("users")
      .find()
      .toArray();
    await con.close();
    return res.send(data).end();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" }).end();
  }
});

export default usersController;
