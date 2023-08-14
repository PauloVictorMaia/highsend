import { useNavigate } from "react-router-dom";
import { Container } from "./sign-in.style";

function SignIn() {
  const navigate = useNavigate()
  return (
    <Container>
      Login
      <button onClick={() => navigate('/fluxograms')}>Login</button>
    </Container>
  )
}

export default SignIn;