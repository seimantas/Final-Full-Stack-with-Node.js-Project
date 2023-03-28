import { Router } from "express";
import { MongoClient, ObjectId } from "mongodb";
import { MONGODB_URI } from "../../config.js";
import { userSchema } from "../models/userSchema.js";

const usersController = Router();

const client = new MongoClient(MONGODB_URI);

usersController.get("/all", async (req, res, next) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("eventsManagerDB")
      .collection("users")
      .find()
      .toArray();
    res.set({
      Authorization: `Bearer ${req.token}`,
      "Content-Type": "application/json",
    });
    return res.send(data);
  } catch (error) {
    next(error);
  } finally {
    await client.close();
  }
});

usersController.use((err, req, res, next) => {
  res.status(500).json({ message: "Internal server error" }).end();
});

usersController.get("/", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("eventsManagerDB")
      .collection("users")
      .find({ eventName: req.query.eventName })
      .toArray();
    await con.close();
    res.set({
      Authorization: `Bearer ${req.token}`,
      "Content-Type": "application/json",
    });
    return res.send(data);
  } catch (error) {
    next(error);
  } finally {
    await client.close();
  }
});

usersController.use((err, req, res, next) => {
  res.status(500).json({ message: "Internal server error" }).end();
});

usersController.post("/", async (req, res) => {
  const { age, dateOfBirth, email, eventName, firstName, lastName } = req.body;

  const newUser = {
    age,
    dateOfBirth,
    email,
    eventName,
    firstName,
    lastName,
  };

  const userValidate = userSchema.validate(newUser);

  if (!age || !dateOfBirth || !email || !eventName || !firstName || !lastName) {
    return res.status(400).json({ message: "Invalid data" }).end();
  }

  const userToRegister = {
    age: age,
    dateOfBirth: dateOfBirth,
    email: email,
    eventName: eventName,
    firstName: firstName,
    lastName: lastName,
  };

  try {
    const con = await client.connect();
    const data = await con
      .db("eventsManagerDB")
      .collection("users")
      .insertOne(userToRegister);
    await con.close();

    return res
      .status(201)
      .send(`User ${firstName} successfully created.`)
      .end();
  } catch (error) {
    next(error);
  } finally {
    await client.close();
  }
});

usersController.use((err, req, res, next) => {
  res.status(500).json({ message: "Internal server error" }).end();
});

usersController.post("/:_id", async (req, res) => {
  const { _id } = req.params;
  const { age, dateOfBirth, email, eventName, firstName, lastName } = req.body;
  console.log(req.params);
  const userToUpdate = {
    age: age,
    dateOfBirth: dateOfBirth,
    email: email,
    eventName: eventName,
    firstName: firstName,
    lastName: lastName,
  };

  try {
    const con = await client.connect();
    const users = con.db("eventsManagerDB").collection("users");
    const user = await users.findOne({ _id: _id });
    if (!user) {
      await con.close();
      return res.status(404).json({ message: "User not found" }).end();
    }

    await users.update({ _id: _id }, { $set: { userToUpdate } });

    await con.close();

    return res
      .status(201)
      .send(`User ${user.firstName} successfully updated.`)
      .end();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" }).end();
  }
});

usersController.delete("/:_id", async (req, res) => {
  const { _id } = req.params;

  try {
    const con = await client.connect();
    const users = con.db("eventsManagerDB").collection("users");

    const user = await users.findOne({ _id: new ObjectId(_id) });
    if (!user) {
      await con.close();
      return res.status(404).json({ message: "User not found" }).end();
    }

    const { firstName } = user;
    await users.deleteOne({ _id: new ObjectId(_id) });

    await con.close();

    return res
      .status(201)
      .send(`User ${firstName} successfully deleted.`)
      .end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" }).end();
  }
});

usersController.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" }).end();
});
export default usersController;
