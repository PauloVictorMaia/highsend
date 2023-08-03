import { createContext, useContext, useState } from "react";

const StateContext = createContext();

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
    const [nodeLabel, setNodeLabel] = useState("");
    const [nodeValue, setNodeValue] = useState("");
    const [placeholder, setPlaceholder] = useState("Type your answer")
    const [buttonLabel, setButtonLabel] = useState("Send")

    return (
        <StateContext.Provider
            value={{
                nodeLabel,
                setNodeLabel,
                nodeValue,
                setNodeValue,
                placeholder,
                setPlaceholder,
                buttonLabel,
                setButtonLabel,
            }}
        >
            {children}
        </StateContext.Provider>
    )
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext);