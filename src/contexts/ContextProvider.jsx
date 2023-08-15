/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'

const StateContext = createContext();

export const ContextProvider = ({ children }) => {

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
                variables,
                setVariables,
                createNewVariable,
                openMenu,
                setOpenMenu,
            }}
        >
            {children}
        </StateContext.Provider>
    )
};

export const useStateContext = () => useContext(StateContext);