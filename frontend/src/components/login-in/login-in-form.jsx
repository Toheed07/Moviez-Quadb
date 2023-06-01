import React, { useState, useContext } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const api_base = "http://localhost:3001";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const credentials = {
      email,
      password,
    };

    axios
      .post(api_base + "/login", credentials)
      .then((response) => {
        console.log(response.data);
        updateUserData(response.data);
        navigate("/home");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          required
          onChange={handleEmailChange}
          autoFocus={true}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          required
          onChange={handlePasswordChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
        <Button
          onClick={() => navigate("/register")}
          variant="text"
          color="primary"
        >
          Don't have an account
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
