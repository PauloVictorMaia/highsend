import { createContext, useContext, useState } from "react";

const StateContext = createContext();

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
    const [nodeLabel, setNodeLabel] = useState("");
    const [nodeValue, setNodeValue] = useState("");

    return (
        <StateContext.Provider value={{ nodeLabel, setNodeLabel, nodeValue, setNodeValue }}>
            {children}
        </StateContext.Provider>
    )
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext);