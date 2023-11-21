import React from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { NavLink } from 'react-router-dom';
import { TextField } from '@mui/material';
import IconLogo from '../../assets/SVGComponents/iconLogo';
import TextLogo from '../../assets/SVGComponents/textLogo';
import { Ring } from '@uiball/loaders';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F8F8F8;
  padding: 20px;
  box-sizing: border-box;
  height: 100vh;

  @media(min-width: 768px){
    height: auto;
    min-heigth: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Content = styled.div`
 background-color: transparent;
 width: 100%;
 max-width: 500px;
 display: flex;
 flex-direction: column;

 .info-content {
    color: #526B92;
    font-weight: 600;
    font-size: 16px;
    width: 100%;
  }

  .icon-container {
    width: 100%;
    display: flex;
    justify-content: center;
    column-gap: 10px;
    margin-bottom: 30px;
  }
`;

export const InputItem = styled(TextField)`
 border: 1.5px solid red;
 border: none;
 width: 100%;

 div {
  border-radius: 8px;
 }

 label {
  color: #526B92;
 }

 fieldset {
  border: 2px solid #E0EAFF;
 }

 input:focus {
  fieldset {
    border: 2px solid #4339F2;
  }

  label {
    color: #4339F2;
  }
 }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  box-sizing: border-box;
  align-items: center;
  margin-top: 30px;

  .forgot-pass {
    font-size: 18px;
    text-align: center;
    margin-top: 20px;
    cursor: pointer;
    width: 200px;
    color: #4339F2;
    font-weight:600;
  }

  .privacy-text {
    color: #526B92;
    font-size: 17px;
    padding: 5px;
    box-sizing: border-box;
    margin-top: 25px;
  }
`;

const StepWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 20px;
    font-weight: 400;
  }
`;

const Button = styled.button`
  background: ${({ outlined }) => outlined ? 'transparent' : '#4339F2'};
  font-family: Arial, sans-serif;
  color: ${({ outlined }) => outlined ? '#4339F2' : '#fff'};
  border-radius: 4px;
  border: ${({ outlined }) => outlined ? '1px solid #4339F2' : 'none'};
  padding: 12px 16px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  display: block;
  width: 100%;
  border-radius: 40px;
  height: 60px;
`;

const Link = styled(NavLink)`
  color: #4339F2;
  cursor: pointer;
  display: block;
  margin-top: 10px;
  text-align: center;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const GoogleLoginButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: white;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  font-size: 16px;

  img {
    width: 20px;
    margin-right: 8px;
  }

  &:hover {
    background-color: #eee;
  }
`;

const ErrorText = styled.div`
  color: red;
  margin-bottom: 15px;
`;

export const CheckBoxContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 5px;
  margin-top: 5px;

  > input:checked {
    background-color: red;
  }
`;

const LoginPage = () => {
  const { signIn, loadingLogin } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={Yup.object({
        username: Yup.string().required('Required'),
        password: Yup.string().min(6, 'Must be 6 characters or more').required('Required')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <PageContainer>
          <Content>
            <div className='icon-container'>
              <IconLogo />
              <TextLogo />
            </div>
            <FormContainer>
              <StepWrapper>
                <h2>Olá! Seja bem vindo.</h2>
              </StepWrapper>
              <span className="info-content">informações pessoais</span>
              <InputItem
                label="E-mail"
                variant="outlined"
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <ErrorText><ErrorMessage name="username" /></ErrorText> */}

              <InputItem
                label="Senha"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <ErrorText><ErrorMessage name="password" /></ErrorText> */}

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

              <Button type="submit" onClick={() => signIn(email, password)}>{loadingLogin ? <Ring color="#fff" size={25} /> : 'Entrar'}</Button>

              <Link style={{ textDecoration: 'none', width: '100%' }} to={`/plans`}>
                <Button type="submit" outlined>Criar uma conta Hiflow</Button>
              </Link>

              <span className="forgot-pass">Esqueci minha senha</span>

              <span className='privacy-text'>
                Seus dados serão respeitados de acordo com nossa <span style={{ color: '#4339F2' }}>política de privacidade</span>
              </span>

              {/* <GoogleLoginButton>
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Logo" />
                Login with Google
              </GoogleLoginButton> */}
            </FormContainer>
          </Content>
        </PageContainer>
      </Form>
    </Formik>
  );
}

export default LoginPage;
