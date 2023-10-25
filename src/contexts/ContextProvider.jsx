/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import api from '../api';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {

    const [variables, setVariables] = useState([]);
    const [openMenu, setOpenMenu] = useState(true);
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState({});
    const [flows, setFlows] = useState([]);
    const [calendarsData, setCalendarsData] = useState([]);
    const [integrations, setIntegrations] = useState([]);
    const [schedulesDataLoaded, setSchedulesDataLoaded] = useState(false);
    const [integrationsDataLoaded, setIntegrationsDataLoaded] = useState(false);
    const [leadsDataLoaded, setLeadsDataLoaded] = useState(false);
    const [createCalendarIsLoading, setCreateCalendarIsLoading] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        getUser(token);
    }, [token]);

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            getFlows();
            getCalendars();
            getIntegrations();
        }
    }, [user]);

    const getUser = async (token) => {
        if (!token && (location.pathname.includes('plans') || location.pathname.includes('subscription'))) {
            return
        }

        try {
            const response = await api.get('/users/get-user', { headers: { authorization: token } });
            if (response.status === 200) {
                setUser(response.data);
                setLogin(true);
                // const location = window.location.pathname;
                // if (location !== '/') return navigate(location);
                // return navigate('/dashboard/fluxograms');
            }
        } catch {
            toast.error('Usuário não autenticado. Faça login novamente.');
            navigate('/login');
        }
    };

    const getFlows = async () => {
        try {
            const response = await api.get(`/flows/get-flows/${user.id}`, { headers: { authorization: token } });
            setFlows(response.data);
            setLeadsDataLoaded(true);
        } catch {
            toast.error('Erro ao carregar flows.');
        }
    };

    async function getCalendars() {
        try {
            const response = await api.get(`/calendars/get-calendars/${user.id}`, { headers: { authorization: token } });
            if (response.status === 201) {
                setCalendarsData(response.data.filteredCalendars);
                setSchedulesDataLoaded(true);
            }
        } catch {
            toast.error('Erro ao buscar agendas.');
        }
    }

    async function getIntegrations() {
        try {
            const response = await api.get(`/integrations/get-integrations-filtered/${user.id}`, { headers: { authorization: token } });
            if (response.status === 200) {
                setIntegrations(response.data.integrationsFiltered);
                setIntegrationsDataLoaded(true);
            }
        } catch {
            return;
        }
    }

    const createCalendar = async () => {
        try {
            setCreateCalendarIsLoading(true);
            const response = await api.post(`calendars/create-calendar/${user.id}`, {}, { headers: { authorization: token } })
            if (response.status === 201) {
                navigate(`/dashboard/schedules/edit/${response.data.id}`);
                getCalendars();
                setCreateCalendarIsLoading(false);
            }
        } catch {
            toast.error('Erro ao criar nova agenda.');
            setCreateCalendarIsLoading(false);
        }
    }

    const signIn = async (email, password) => {
        if (!email || !password) return toast.warning('Faltam dados!');

        try {
            const response = await api.post('/users/sign-in', { email, password });
            if (response.status === 200) {
                getUser(response.data.token);
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                setLogin(true);
                navigate('/dashboard/fluxograms');
            }
        }
        catch {
            toast.warning('Usuário ou senha incorretos. Verifique os dados e tente novamente.');
        }
    };

    const signOut = () => {
        localStorage.removeItem('token');
        setLogin(false);
        navigate('/');
    };

    const createNewVariable = (newVariable) => {
        if (newVariable) {
            const nameExists = variables.some(variable => variable.name === newVariable);
            if (!nameExists) {
                const variable = { id: uuidv4(), name: newVariable, value: "" };
                setVariables((variables) => [...variables, variable]);
                toast.success('Variável criada com sucesso.');
            } else {
                toast.info('Já existe uma variável com esse nome.');
            }
        } else {
            toast.warning('Campo vazio.');
        }
    };

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
                signIn,
                getFlows,
                flows,
                calendarsData,
                getCalendars,
                integrations,
                getIntegrations,
                schedulesDataLoaded,
                leadsDataLoaded,
                integrationsDataLoaded,
                createCalendar,
                createCalendarIsLoading
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);

