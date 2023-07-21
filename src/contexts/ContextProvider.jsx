import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
    const [nodeLabel, setNodeLabel] = useState("");
    const [nodeValue, setNodeValue] = useState("");

    return (
        <StateContext.Provider value={{ nodeLabel, setNodeLabel, nodeValue, setNodeValue }}>
            {children}
        </StateContext.Provider>
    )
};

export const useStateContext = () => useContext(StateContext);