import { Router } from "express";
import { MongoClient } from "mongodb";
import { MONGODB_URI } from "../../config.js";
import { eventSchema } from "../models/eventsSchema.js";

const eventController = Router();

const client = new MongoClient(MONGODB_URI);

eventController.get("/", async (_, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("eventsManagerDB")
      .collection("events")
      .find()
      .toArray();
    await con.close();

    return res.send(data).end();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" }).end();
  }
});

eventController.post("/", async (req, res) => {
  const { eventName, participants } = req.body;

  const newEventData = {
    eventName,
    participants,
  };

  const validEventData = eventSchema.validate(newEventData);

  if (!eventName || !participants) {
    return res.status(400).json({ message: "Invalid data" }).end();
  }

  const eventToRegister = {
    eventName: eventName,
    participants: participants,
  };

  try {
    const con = await client.connect();
    const data = await con
      .db("eventsManagerDB")
      .collection("admins")
      .insertOne(eventToRegister);
    await con.close();

    return res
      .status(201)
      .send(`Event ${eventName} successfully created.`)
      .end();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" }).end();
  }
});

eventController.patch("/:_id", async (req, res) => {
  const { _id } = req.params;
  const { participants } = req.body;

  const eventToUpdate = {
    eventName,
    participants,
  };

  try {
    const con = await client.connect();
    const data = await con
      .db("eventsManagerDB")
      .collection("events")
      .findOneAndUpdate(_id, { $set: eventToUpdate });
    await con.close();

    return res.send(data).end();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" }).end();
  }
});

eventController.delete("/:eventName", async (req, res) => {
  const { eventName } = req.params;

  try {
    const con = await client.connect();
    const data = await con
      .db("eventsManagerDB")
      .collection("events")
      .deleteOne({ eventName: eventName });
    await con.close();

    return res.send(data).end();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" }).end();
  }
});

export default eventController;
