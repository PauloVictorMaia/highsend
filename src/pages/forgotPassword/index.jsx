import { Container, EditInputsContent, CheckBoxContainer, InputItem, Content, StepWrapper } from "./styles";
import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Ring } from "@uiball/loaders";
import IconLogo from '../../assets/SVGComponents/iconLogo';
import TextLogo from '../../assets/SVGComponents/textLogo';

function ForgotPassword() {

  const params = useParams();
  const navigate = useNavigate();
  const token = params.token;
  const userID = params.userId;
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const forgotPassword = async () => {

    if (newPassword.length < 8) {
      toast.warning("Sua nova senha deve conter pelo menos 8 caracteres");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.warning("Há uma diferença entre as senhas. Verifique os dados e tente novamente.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.patch(`/users/forgot-password/${userID}`, { newPassword, token });
      if (response.status === 200) {
        toast.success("Tudo certo! Sua nova senha já pode ser usada");
        setIsLoading(false);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error(`${error.response.data.message}`);
        setIsLoading(false);
      }
    }
  }

  return (
    <Container>
      <Content>
        <div className='icon-container'>
          <IconLogo />
          <TextLogo />
        </div>
        <EditInputsContent>
          <StepWrapper>
            <h2>Olá! Vamos alterar sua senha.</h2>
          </StepWrapper>
          {/* <input
            type={showPassword ? "text" : "password"}
            defaultValue={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nova senha"
            maxLength={8}
          /> */}

          {/* <input
            type={showPassword ? "text" : "password"}
            defaultValue={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme sua nova senha"
            maxLength={8}
          /> */}

          <InputItem
            label="Nova Senha"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            name="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <InputItem
            label="Confirme a nova senha"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            name="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <CheckBoxContainer>
            <input
              type="checkbox"
              id="show-password"
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="show-password" className="show-password">Mostrar senha</label>
          </CheckBoxContainer>
          <button onClick={() => forgotPassword()}>
            {isLoading ? <Ring color="#fff" size={20} /> : "Alterar senha"}
          </button>
        </EditInputsContent>
      </Content>
    </Container>
  )
}

export default ForgotPassword;