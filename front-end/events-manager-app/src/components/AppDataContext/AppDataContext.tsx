import { createContext } from "react";
import { TAppDataContext } from "./type";

export const INITIAL_VALUE: TAppDataContext ={
    events: [],
    users: [],
    admins: [],
}

export const AppDataContext = createContext(INITIAL_VALUE);