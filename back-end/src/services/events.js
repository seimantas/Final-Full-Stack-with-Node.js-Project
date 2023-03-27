import { Router } from "express";
import { MongoClient } from "mongodb";
import { MONGODB_URI } from "../../config.js";
import { eventSchema } from "../models/eventsSchema.js";

const eventController = Router();

const client = new MongoClient(MONGODB_URI);

eventController.get("/", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("eventsManagerDB")
      .collection("events")
      .find()
      .toArray();
    await con.close();
    res.set({
      Authorization: `Bearer ${req.token}`,
      "Content-Type": "application/json",
    });
    return res.send(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" }).end();
  }
});

eventController.post("/", async (req, res) => {
  const { eventName } = req.body;

  const newEventData = {
    eventName,
  };

  const validEventData = eventSchema.validate(newEventData);

  if (!eventName) {
    return res.status(400).json({ message: "Invalid data" }).end();
  }

  const eventToRegister = {
    eventName: eventName,
  };

  try {
    const con = await client.connect();
    const data = await con
      .db("eventsManagerDB")
      .collection("events")
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
