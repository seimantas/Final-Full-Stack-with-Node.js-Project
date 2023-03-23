import bcrypt from "bcryptjs";
import { Router } from "express";
import { MongoClient } from "mongodb";
import { MONGODB_URI } from "../../config.js";
import { adminSchema } from "../models/adminSchema.js";

const adminRegisterController = Router();

const client = new MongoClient(MONGODB_URI);

adminRegisterController.post("/", async (req, res) => {
  const { firstName, lastName, password } = req.body;

  const NewAdminData = {
    firstName,
    lastName,
    password,
  };

  const validAdminData = adminSchema.validate(NewAdminData);
  if (validAdminData.error) {
    return res.status(400).json({ message: "Invalid validation" }).end();
  }
  const hashedPassword = await bcrypt.hash(password, 1);

  if (!password || !firstName || !lastName) {
    return res.status(400).json({ message: "Invalid data" }).end();
  }

  const adminToRegister = {
    firstName: firstName,
    lastName: lastName,
    password: hashedPassword,
  };

  try {
    const con = await client.connect();
    const data = await con
      .db("eventsManagerDB")
      .collection("admins")
      .insertOne(adminToRegister);
    await con.close();
    return res
      .status(201)
      .send(`User ${firstName} successfully created.`)
      .end();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" }).end();
  }
});

export default adminRegisterController;
