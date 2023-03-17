import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN_USER } from '../utils/mutations';
import auth from '../utils/auth';
import { useNavigate } from "react-router-dom";
import {
  useToast, Button, FormControl, FormHelperText, FormLabel, Input, InputGroup, InputRightElement,
  VStack,
}
  from "@chakra-ui/react";



const LoginForm = () => {

  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      auth.login(token);
      navigate('/dashboard')
    } catch (e) {
      console.log(e);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };


  return (
    <div className="container my-1">

      <FormControl isRequired onSubmit={handleFormSubmit}>
        <FormLabel htmlFor="email">Email:</FormLabel>
        <Input
          placeholder="email@test.com"
          name="email"
          type="email"
          id="email"
          onChange={handleChange}
        />
        <FormHelperText>We'll never share your email.</FormHelperText>
        <FormLabel htmlFor="pwd">Password:</FormLabel>
        <Input
          placeholder="********"
          name="password"
          type="password"
          id="pwd"
          onChange={handleChange}
        />
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <Button
          borderRadius={0}
          type="submit"
          variant="solid"
          colorScheme="teal"
          width="full"
          marginTop={5}
        >
          Login
        </Button>
      </FormControl>
    </div>
  );
}

export default LoginForm;