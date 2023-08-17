/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import api from '../api'
import { useNavigate } from "react-router-dom";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {

    const [variables, setVariables] = useState([])
    const [openMenu, setOpenMenu] = useState(true);
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState({});
    const [token, setToken] = useState(localStorage.getItem('token'))
    const navigate = useNavigate()

    const createNewVariable = (newVariable) => {
        if (newVariable) {
            const nameExists = variables.some(variable => variable.name === newVariable);
            if (!nameExists) {
                const variable = { id: uuidv4(), name: newVariable };
                setVariables((variables) => [...variables, variable]);
                console.log('Variável criada com sucesso!');
            } else {
                console.log("Já existe uma variável com esse nome!");
            }
        } else {
            console.log('Campo vazio.')
        }
    }

    const getUser = async (token) => {
        if (!token) {
            return
        }
        try {
            const response = await api.get('/users/get-user', { headers: { authorization: token } });
            if (response.status === 200) {
                setUser(response.data)
                setLogin(true)
                navigate(`/fluxograms/${response.data.id}`)
            }
        } catch (error) {
            console.log('Usuário não autenticado', error);
        }
    }

    const createFlow = async (userID) => {
        try {
            const response = await api.post(`/flows/create-flow/${userID}`);
            if (response.status === 201) {
                navigate(`/fluxograms/edit/${userID}/${response.data.id}`)
            }
        } catch (error) {
            console.log('Erro ao criar novo flow', error);
        }
    }

    return (
        <StateContext.Provider
            value={{
                variables,
                setVariables,
                createNewVariable,
                openMenu,
                setOpenMenu,
                login,
                setLogin,
                user,
                setUser,
                token,
                setToken,
                getUser,
                createFlow,
            }}
        >
            {children}
        </StateContext.Provider>
    )
};

export const useStateContext = () => useContext(StateContext);