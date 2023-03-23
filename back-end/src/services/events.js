import { MongoClient } from "mongodb";
import { MONGODB_URI } from "../../config";

const client = new MongoClient(MONGODB_URI);

export const getEvents = async (res) => {
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
};
