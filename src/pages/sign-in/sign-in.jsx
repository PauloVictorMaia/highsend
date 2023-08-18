/* eslint-disable no-unused-vars */
import { Container } from "./sign-in.style";
import { useState } from "react";
import api from '../../api'
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router";

function SignIn() {

  const { setLogin, setToken, getUser } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = async () => {
    if (!email || !password) {
      alert('Faltam dados!')
    }
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
      console.log('Não foi possível fazer o login', error);
      alert('Usuário ou senha incorretos. Verifique os dados e tente novamente.')
    }
  }

  return (
    <Container>
      Login
      <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={signIn}>Login</button>
    </Container>
  )
}

export default SignIn;