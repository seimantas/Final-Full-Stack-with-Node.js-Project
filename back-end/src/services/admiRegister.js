import bcrypt from "bcryptjs";
import { Router } from "express";
import { MongoClient } from "mongodb";
import { MONGODB_URI } from "../../config.js";
import { adminSchema } from "../models/admin.js";

const adminRegisterController = Router();

const client = new MongoClient(MONGODB_URI);

adminRegisterController.post("/", async (req, res) => {
  const { firstName, lastName, password } = req.body;

  const newAdminData = {
    firstName,
    lastName,
    password,
  };

  const validAdminData = adminSchema.validate(newAdminData);
  if (validAdminData.error) {
    return res.status(400).json({ message: "Invalid validation" });
  }
  const hashedPassword = bcrypt.hash(password, 10);

  if (!password || !firstName || !lastName) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const adminToRegister = { firstName, lastName, hashedPassword };

  console.log(adminToRegister);

  try {
    const con = await client.connect();
    const data = await con
      .db("eventsManagerDB")
      .collection("admins")
      .insertOne(adminToRegister);
    await con.close();
    return res.status(201).send(`User ${firstName} successfully created.`);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default adminRegisterController;
