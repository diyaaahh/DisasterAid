import {createContext, useContext, useState } from "react";

export const HospitalContext= createContext();

export const useHospitalContext = ()=>{
    return useContext(HospitalContext);
}

export const HospitalContextProvider = ({children})=>{

    const [currentHospital, setCurrentHospital] = useState(null);

    return  <HospitalContext.Provider value={{currentHospital, setCurrentHospital}}> {children}</HospitalContext.Provider>;
}