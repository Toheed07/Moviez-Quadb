import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  IconButton,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MovieCard from "../../components/movie-card/movieCard";
import axios from "axios";

const API_URL = "https://api.tvmaze.com/search/shows?q=all";

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovie = async (title) => {
    try {
      const response = await axios.get(API_URL);
      const filteredMovies = response.data.filter((movie) =>
        movie.show.name.toLowerCase().includes(title.toLowerCase())
      );
      setMovies(filteredMovies);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h1" component="h1" align="center" gutterBottom>
        Moviez
      </Typography>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <TextField
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <IconButton
            color="primary"
            aria-label="Search"
            onClick={() => searchMovie(searchTerm)}
            sx={{ height: "100%" }}
          >
            <SearchIcon />
          </IconButton>
        </Grid>
      </Grid>

      {movies?.length > 0 ? (
        <Grid container spacing={2}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.show.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div>
          <Typography variant="h2">No Movie Found</Typography>
        </div>
      )}
    </Container>
  );
}

export default Home;
