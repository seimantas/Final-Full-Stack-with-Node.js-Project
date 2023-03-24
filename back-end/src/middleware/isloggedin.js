import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config.js";

export const isLoggedIn = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" }).end();
  }
  try {
    jwt.verify(token, JWT_SECRET);

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" }).end();
  }
};
