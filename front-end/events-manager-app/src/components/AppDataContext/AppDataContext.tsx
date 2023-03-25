import { createContext } from "react";

const INITIAL_VALUE ={
    events: [],
    users: [],
    admins: [],
} as const

export const AppDataContext = createContext(INITIAL_VALUE);