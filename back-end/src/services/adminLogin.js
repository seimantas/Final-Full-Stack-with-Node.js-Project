import { Router } from "express";
import { MongoClient } from "mongodb";
import { MONGODB_URI, JWT_SECRET } from "../../config.js";
import { adminSchema } from "../models/adminSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const adminLoginController = Router();

const client = new MongoClient(MONGODB_URI);

adminLoginController.post("/", async (req, res) => {
  const { firstName, lastName, password } = req.body;

  const newAdminData = {
    firstName,
    lastName,
    password,
  };

  const validAdminData = adminSchema.validate(newAdminData);

  if (validAdminData.error) {
    return res.status(400).json({ message: "Invalid validation" }).end();
  }

  const adminToFind = { firstName: firstName, lastName: lastName };

  try {
    const con = await client.connect();
    const data = await con
      .db("eventsManagerDB")
      .collection("admins")
      .findOne(adminToFind);

    await con.close();
    if (!data) {
      return res.status(404).json({ message: "Admin not found" }).end();
    }

    const isAdminAuth = await bcrypt.compare(password, data.password);

    if (isAdminAuth) {
      const token = jwt.sign({ firstName, lastName }, JWT_SECRET);

      return res.send({ message: "Admin successfully logged in", token }).end();
    }

    return res.status(401).send({ err: "Admin is not authorized" }).end();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" }).end();
  }
});

export default adminLoginController;
