/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import api from '../api'
import { useNavigate } from "react-router-dom";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {

    const [variables, setVariables] = useState([])
    const [openMenu, setOpenMenu] = useState(true);
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState({});
    // eslint-disable-next-line no-unused-vars
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
        getUser(token)
    }, [token])

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
        if (!token) return navigate('/');

        try {
            const response = await api.get('/users/get-user', { headers: { authorization: token } });
            if (response.status === 200) {
                setUser(response.data);
                setLogin(true);
                const location = window.location.pathname;
                if (location !== '/') return navigate(location);
                return navigate('/fluxograms')
            }
        } catch (error) {
            console.log('Usuário não autenticado', error);
            navigate('/');
        }
    }

    const signIn = async (email, password) => {
        if (!email || !password) return alert('Faltam dados!');

        try {
            const response = await api.post('/users/sign-in', { email, password });
            if (response.status === 200) {
                getUser(response.data.token)
                setToken(response.data.token)
                localStorage.setItem('token', response.data.token);
                setLogin(true)
                navigate('/fluxograms')
            }
        }
        catch (error) {
            alert('Usuário ou senha incorretos. Verifique os dados e tente novamente.')
        }
    }

    const signOut = () => {
        localStorage.removeItem('token');
        setLogin(false);
        navigate('/')
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
                setToken,
                getUser,
                signOut,
                signIn
            }}
        >
            {children}
        </StateContext.Provider>
    )
};

export const useStateContext = () => useContext(StateContext);