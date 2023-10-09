import React from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { NavLink } from 'react-router-dom';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #999;
`;

const FormContainer = styled.div`
  width: 40%;
  max-width: 500px;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Title = styled.h1`
  color: #F26800;
  margin-bottom: 30px;
  text-align: center;
`;

const Input = styled(Field)`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  border-radius: 8px;
  background-color: #eee;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin: 15px 0;
  border: none;
  border-radius: 8px;
  background-color: #F26800;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d45700;
  }
`;

const Link = styled(NavLink)`
  color: #F26800;
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

const LoginPage = () => {
  const { signOut, signIn } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <FormContainer>
            <Title>Login</Title>

            <Input name="username" type="text" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
            <ErrorText><ErrorMessage name="username" /></ErrorText>

            <Input name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <ErrorText><ErrorMessage name="password" /></ErrorText>

            <Button type="submit" onClick={() => signIn(email, password)}>Login</Button>
            <GoogleLoginButton>
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Logo" />
              Login with Google
            </GoogleLoginButton>
            <Link to={`/plans`}>Don't have an account? Sign Up</Link>
          </FormContainer>
        </PageContainer>
      </Form>
    </Formik>
  );
}

export default LoginPage;
