import { Router } from "express";
import { MongoClient } from "mongodb";
import { MONGODB_URI } from "../config";

const users = Router();

const client = new MongoClient(MONGODB_URI);

users.get("/users", async (_, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("eventsManagerDB")
      .collection("users")
      .find()
      .toArray();
    await con.close();
    return res.send(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default users;
