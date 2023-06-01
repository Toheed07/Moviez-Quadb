import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const api_base = "http://localhost:3001";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      name,
      email,
      password,
    };

    axios
      .post(api_base + "/register", user)
      .then((response) => {
        navigate("/home");
        updateUserData(user);
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
        Register
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          required
          onChange={handleNameChange}
          autoFocus={true}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          required
          onChange={handleEmailChange}
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
          Register
        </Button>
        <Button onClick={() => navigate("/")} variant="text" color="primary">
          Already have an account
        </Button>
      </form>
    </Box>
  );
};

export default RegistrationForm;
