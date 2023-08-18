/* eslint-disable no-unused-vars */
import { Container } from "./sign-in.style";
import { useState } from "react";
import api from '../../api'
import { useStateContext } from "../../contexts/ContextProvider";

function SignIn() {

  const { signOut, signIn } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container>
      Login
      <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => signIn(email, password)}>Login</button>
      <button onClick={() => signOut()}>LogOut</button>
    </Container>
  )
}

export default SignIn;