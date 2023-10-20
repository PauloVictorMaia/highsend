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
        const currentDate = new Date();
        const futureDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 1);
        futureDate.setDate(futureDate.getDate() + 30);
        const format = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}T00:00:00.000Z`;
        };
        const formattedCurrentDate = format(currentDate);
        const formattedFutureDate = format(futureDate);
        const calendar = {
            room: {
                id: uuidv4(),
                createdAt: new Date(),
                type: "oneaone",
                vacancies: 1,
                active: true,
                color: "#ff6699",
                title: "Meu calendario de eventos",
                local: { type: "Online Google Meet", local: "Google Meet" },
                integration: { hasIntegration: false, integrations: [] },
                eventDuration: 40,
                eventInterval: 10
            },
            calendar: {
                lunchStartTime: "12:00",
                lunchEndTime: "13:00",
                type: "daysAhead",
                startDate: formattedCurrentDate,
                endDate: formattedFutureDate,
                timezone: "America/Sao_Paulo",
                eventsIntervals: [
                    {
                        day: "segunda",
                        eventCount: 7,
                        eventTimes: [
                            {
                                start: "09:00",
                                end: "09:40"
                            },
                            {
                                start: "09:50",
                                end: "10:30"
                            },
                            {
                                start: "10:40",
                                end: "11:20"
                            },
                            {
                                start: "13:10",
                                end: "13:50"
                            },
                            {
                                start: "14:00",
                                end: "14:40"
                            },
                            {
                                start: "14:50",
                                end: "15:30"
                            },
                            {
                                start: "15:40",
                                end: "16:20"
                            }
                        ]
                    },
                    {
                        day: "terça",
                        eventCount: 7,
                        eventTimes: [
                            {
                                start: "09:00",
                                end: "09:40"
                            },
                            {
                                start: "09:50",
                                end: "10:30"
                            },
                            {
                                start: "10:40",
                                end: "11:20"
                            },
                            {
                                start: "13:10",
                                end: "13:50"
                            },
                            {
                                start: "14:00",
                                end: "14:40"
                            },
                            {
                                start: "14:50",
                                end: "15:30"
                            },
                            {
                                start: "15:40",
                                end: "16:20"
                            }
                        ]
                    },
                    {
                        day: "quarta",
                        eventCount: 7,
                        eventTimes: [
                            {
                                start: "09:00",
                                end: "09:40"
                            },
                            {
                                start: "09:50",
                                end: "10:30"
                            },
                            {
                                start: "10:40",
                                end: "11:20"
                            },
                            {
                                start: "13:10",
                                end: "13:50"
                            },
                            {
                                start: "14:00",
                                end: "14:40"
                            },
                            {
                                start: "14:50",
                                end: "15:30"
                            },
                            {
                                start: "15:40",
                                end: "16:20"
                            }
                        ]
                    },
                    {
                        day: "quinta",
                        eventCount: 7,
                        eventTimes: [
                            {
                                start: "09:00",
                                end: "09:40"
                            },
                            {
                                start: "09:50",
                                end: "10:30"
                            },
                            {
                                start: "10:40",
                                end: "11:20"
                            },
                            {
                                start: "13:10",
                                end: "13:50"
                            },
                            {
                                start: "14:00",
                                end: "14:40"
                            },
                            {
                                start: "14:50",
                                end: "15:30"
                            },
                            {
                                start: "15:40",
                                end: "16:20"
                            }
                        ]
                    },
                    {
                        day: "sexta",
                        eventCount: 7,
                        eventTimes: [
                            {
                                start: "09:00",
                                end: "09:40"
                            },
                            {
                                start: "09:50",
                                end: "10:30"
                            },
                            {
                                start: "10:40",
                                end: "11:20"
                            },
                            {
                                start: "13:10",
                                end: "13:50"
                            },
                            {
                                start: "14:00",
                                end: "14:40"
                            },
                            {
                                start: "14:50",
                                end: "15:30"
                            },
                            {
                                start: "15:40",
                                end: "16:20"
                            }
                        ]
                    }
                ],
                daysOfTheWeek: [
                    {
                        day: "domingo",
                        available: false,
                        dayValue: 0,
                        startTime: "09:00",
                        endTime: "17:00"
                    },
                    {
                        day: "segunda",
                        available: true,
                        dayValue: 1,
                        startTime: "09:00",
                        endTime: "17:00"
                    },
                    {
                        day: "terça",
                        available: true,
                        dayValue: 2,
                        startTime: "09:00",
                        endTime: "17:00"
                    },
                    {
                        day: "quarta",
                        available: true,
                        dayValue: 3,
                        startTime: "09:00",
                        endTime: "17:00"
                    },
                    {
                        day: "quinta",
                        available: true,
                        dayValue: 4,
                        startTime: "09:00",
                        endTime: "17:00"
                    },
                    {
                        day: "sexta",
                        available: true,
                        dayValue: 5,
                        startTime: "09:00",
                        endTime: "17:00"
                    },
                    {
                        day: "sábado",
                        available: false,
                        dayValue: 6,
                        startTime: "09:00",
                        endTime: "17:00"
                    }
                ],
                daysAhead: "3"
            },
            events: []
        };

        try {
            const response = await api.post(`calendars/create-calendar/${user.id}`, { calendar }, { headers: { authorization: token } })
            if (response.status === 201) {
                navigate(`/dashboard/schedules/edit/${response.data.id}`);
                getCalendars();
            }
        } catch {
            toast.error('Erro ao criar nova agenda.')
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
                createCalendar
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);

