
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Lottie from 'react-lottie-player';
import strongAnimation from './strong.json';  

const DetallesPost = () => {
  const [post, setPost] = useState(null);
  const { id: postId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://spring.serverjpg.date/post/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error al buscar detalles del post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return (
      <Grid container justifyContent="center" marginTop={'60px'}>
        <Skeleton variant="rectangular" width={300} height={200} />
      </Grid>
    );
  }

  return (
    <Grid container justifyContent="center" marginTop={'60px'} padding={2}>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'row', 
          maxWidth: '1200px', 
          width: '100%',
          bgcolor: 'background.paper', 
          boxShadow: 3, 
          borderRadius: 2, 
          overflow: 'hidden',
          marginBottom: 4,
          transition: 'transform 0.3s, box-shadow 0.3s',  // Efecto de transición
          '&:hover': {
            transform: 'scale(1.03)',  // Escala al pasar el ratón
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',  // Sombra adicional al pasar el ratón
          }
        }}
      >
        <Box sx={{ 
          p: 3, 
          flex: 2, 
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%)',
          animation: 'fadeIn 1s',  
          '@keyframes fadeIn': {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
        }}>
          <Typography 
            gutterBottom 
            variant="h4" 
            sx={{ 
              fontWeight: 'bold', 
              animation: 'fadeInLeft 1s',  
              '@keyframes fadeInLeft': {
                from: { opacity: 0, transform: 'translateX(-50px)' },
                to: { opacity: 1, transform: 'translateX(0)' },
              },
            }}
          >
            {post.titulo}
          </Typography>
          <Typography 
            display="block" 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              mb: 2, 
              textAlign: 'justify',
              animation: 'fadeInRight 1s', 
              '@keyframes fadeInRight': {
                from: { opacity: 0, transform: 'translateX(50px)' },
                to: { opacity: 1, transform: 'translateX(0)' },
              },
            }}
          >
            {post.descripcion}
          </Typography>
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ 
              animation: 'fadeInUp 1s', 
              '@keyframes fadeInUp': {
                from: { opacity: 0, transform: 'translateY(20px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            Fecha del artículo: {new Date(post.fecha).toLocaleDateString()}
          </Typography>
        </Box>
        <Box 
          sx={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            bgcolor: 'rgba(0, 0, 0, 0.05)',  // Fondo 
            transition: 'background 0.3s',  // Efecto de transición
            '&:hover': {
              background: 'rgba(0, 0, 0, 0.1)',  // Cambio de fondo al pasar el ratón
            }
          }}
        >
          <Lottie 
            loop 
            animationData={strongAnimation} 
            play 
            style={{ width: '100%', height: 'auto' }} 
          />
        </Box>
      </Box>
    </Grid>
  );
};

export default DetallesPost;
