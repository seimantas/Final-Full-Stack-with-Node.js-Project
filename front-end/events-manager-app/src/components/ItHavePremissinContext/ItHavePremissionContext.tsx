import { createContext } from "react";


const ItHavePremission ={
    isLogdin: false,
    setIsLogdin: (value: boolean) => {}  
};

export const ItHavePremissionContext = createContext(ItHavePremission);
