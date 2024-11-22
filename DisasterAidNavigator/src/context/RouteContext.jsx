import {createContext, useContext, useState } from "react";

export const RouteContext= createContext();

export const useRouteContext = ()=>{
    return useContext(RouteContext);
}

export const RouteContextProvider = ({children})=>{

    const [availableRoute, setAvailableRoute] = useState(null);

    return  <RouteContext.Provider value={{availableRoute, setAvailableRoute}}> {children} </RouteContext.Provider> ;
}