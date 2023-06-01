import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const { name, premiered, image, genres, language, summary } = movie.show;

  const handleClick = () => {
    navigate(`/ticket/${movie.show.id}`);
  };

  return (
    <Button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ textAlign: 'left', width: '100%' }}
    >
      <Card>
        <CardContent>
          {isHovered ? (
            <Typography variant="body2" color="text.secondary">
              {summary}
            </Typography>
          ) : (
            <>
              <img src={image.medium} alt={name} />
              <Typography variant="h5" component="div">
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`${premiered.slice(0, 4)} | ${language} | ${genres.join(', ')}`}
              </Typography>
            </>
          )}
          {isHovered && (
            <>
              <IconButton
                sx={{ position: 'absolute', top: 8, right: 8, color: 'primary.main' }}
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <ShoppingCartIcon />
              </IconButton>
            </>
          )}
        </CardContent>
      </Card>
    </Button>
  );
};

export default MovieCard;
