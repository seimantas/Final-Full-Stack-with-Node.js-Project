import dotenv from "dotenv";

dotenv.config();

export const LOCAL_PORT = process.env.LOCAL_PORT;
export const MONGODB_URI =
  process.env.MONGODB_URI ?? `${process.env.MONGODB_URI}`;
