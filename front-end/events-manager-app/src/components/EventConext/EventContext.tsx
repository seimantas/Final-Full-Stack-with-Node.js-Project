import { createContext } from "react";
import { TEventContext } from "./type";


const EVENT_NAMES =[""]
  

export const EventContext = createContext<TEventContext>({
    eventName: [],
    setEventName: () => {},
  });