import React, { useState,useContext, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { UserContext } from "../../context/UserContext";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TicketBuying = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [quantity, setQuantity] = useState("");
  const { userData } = useContext(UserContext);
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Name:', name);
    console.log('Movie Name:', movie);
    console.log('Email:', email);
    console.log('Ticket Type:', ticketType);
    console.log('Quantity:', quantity);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Ticket Buying Form
      </Typography>
      <form onSubmit={handleSubmit}>
      <TextField
          label="MovieName"
          value={movie.name}
          onChange={(e) => setMovie(e.target.value)}
          fullWidth
          required
          margin="normal"
          autoFocus
        />
        <TextField
          label="Name"
          value={userData && userData.name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
          autoFocus
        />
        <TextField
          label="Email"
          value={userData && userData.email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <FormControl fullWidth required margin="normal">
          <InputLabel>Ticket Type</InputLabel>
          <Select
            value={ticketType}
            onChange={(e) => setTicketType(e.target.value)}
            label="Ticket Type"
          >
            <MenuItem value="standard">Standard</MenuItem>
            <MenuItem value="premium">Premium</MenuItem>
            <MenuItem value="vip">VIP</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="number"
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Buy Tickets
        </Button>
      </form>
    </Container>
  );
};

export default TicketBuying;
