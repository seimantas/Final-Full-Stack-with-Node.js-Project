import { Router } from "express";
import { getEvents } from "../services/events";

const eventController = Router();

eventController.get("/", getEvents);

export default eventController;
