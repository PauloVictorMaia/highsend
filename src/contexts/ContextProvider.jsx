import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'

const StateContext = createContext();

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
    const [nodeLabel, setNodeLabel] = useState("");
    const [nodeValue, setNodeValue] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const [buttonLabel, setButtonLabel] = useState("");
    const [assignedVariable, setAssignedVariable] = useState("")
    const [variables, setVariables] = useState(() => {
        const storedVariables = localStorage.getItem('variables');
        return storedVariables ? JSON.parse(storedVariables) :
            [{ id: uuidv4(), name: 'Nome' }, { id: uuidv4(), name: 'Email' }, { id: uuidv4(), name: 'Telefone' }];
    });
    const [openMenu, setOpenMenu] = useState(false)
    const createNewVariable = (newVariable) => {
        if (newVariable) {
            const nameExists = variables.some(variable => variable.name === newVariable);
            if (!nameExists) {
                const variable = { id: uuidv4(), name: newVariable };
                setVariables([...variables, variable]);
                localStorage.setItem('variables', JSON.stringify([...variables, variable]));
                console.log('Variável criada com sucesso!')
            } else {
                console.log("Já existe uma variável com esse nome!");
            }
        } else {
            console.log('Campo vazio.')
        }
    }

    useEffect(() => {
        localStorage.setItem('variables', JSON.stringify(variables));
    }, [variables]);

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
                variables,
                setVariables,
                createNewVariable,
                assignedVariable,
                setAssignedVariable,
                openMenu,
                setOpenMenu,
            }}
        >
            {children}
        </StateContext.Provider>
    )
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext);