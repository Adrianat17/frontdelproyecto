/* eslint-disable no-unused-vars */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import {
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Principal.css';
import posts from './imagenes/posts.jpg';
import calculadora_calorias from './imagenes/calculadora_calorias.jpg';
import registrosCal from './imagenes/registrosCal.jpg';
import calculadoraMenu from './imagenes/calculadoraMenu.jpg';
import postMenu from './imagenes/postMenu.jpg';
import registroMenu from './imagenes/registroMenu.jpg';

const images = [
  {
    url: postMenu,
    title: 'Post',
    width: '40%',
    link: '/post',
  },
  {
    url: calculadoraMenu,
    title: 'Calculadora de calorías',
    width: '30%',
    link: '/calculadora',
  },
  {
    url: registroMenu,
    title: 'Registro de calorías',
    width: '30%',
    link: '/registro',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  margin: 0, // Remove any margin between the buttons
  [theme.breakpoints.down('sm')]: {
    width: '100% !important',
    height: 150,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

function ButtonBaseDemo() {
  const navigate = useNavigate();

  const handleRedirect = (link) => {
    navigate(link);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '0', marginTop:'49px' }}>
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
          onClick={() => handleRedirect(image.link)}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="h6"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
  );
}

function Principal() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      nombre: 'posts',
      imagen: posts,
      descripcion: [
        '',
        'Trataré de compartir diferentes artículos interesantes sobre rutinas, recomendaciones sobre ejercicios u opiniones y experiencias personales dentro del mundo fitness',
        'El contenido será gratuito y de libre acceso para todos.',
      ],
    },
    {
      id: 2,
      nombre: 'Calculadora de calorías',
      imagen: calculadora_calorias,
      descripcion: [
        '',
        'Para todos aquellos que quieren hacer un mejor seguimiento de las calorías ingeridas y no quieren comprar APPS premiums',
        'Permite filtrados de comida, almacenar resultados e incluso añadir nuevos alimentos por parte del usuario',
      ],
    },
    {
      id: 3,
      nombre: 'Registros de consumo',
      imagen: registrosCal,
      descripcion: [
        '',
        'Te permitirá llevar un registro diario de tus calorías objetivo y el total de calorías ingeridas',
        'De esta forma, facilitará un mejor seguimiento y por consiguiente, un desarrollo óptimo.',
      ],
    },
  ]);

  const [expanded, setExpanded] = useState(null);

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const handleClick = (id) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id
          ? { ...contact, imageId: Math.random() * 10000000000 }
          : contact
      )
    );
  };

  return (
    <>
      <ButtonBaseDemo />

      <Container>
        <Typography className="Typography" variant="h4" gutterBottom>
          <center>WemFITNESS ⇝ Proyecto de Adrián Alonso</center>
        </Typography>
      </Container>

      <Accordion defaultExpanded>
        <AccordionSummary>
          <strong>¿Qué es WemFITNESS?</strong>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <strong>Wellness + Effort + Mind</strong> (Bienestar + esfuerzo + mente) + FITness, nace como proyecto final de ciclo de Adrián Alonso. Su objetivo es crear un espacio donde compartir sus conocimientos y proporcionarle al usuario herramientas gratuitas que en otros lugares conllevarían coste.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <strong>Público objetivo</strong>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            WemFIT es para todos los públicos. Desde personas ya avanzadas en el mundo del deporte como principiantes. 
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <strong>Mi experiencia</strong>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <strong>Experiencia y conocimientos</strong>
            A mis 25 años, he realizado deporte desde los 3 años y me he adentrado en el mundo del fitness, con 14 años de edad. He realizado diversos cursos, tanto de nutrición como de entrenamiento, también me he formado leyendo libros, siguiendo a personas referentes dentro del mundo y sobre todo, mediante el ensayo-error.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <h2 className="funcionalidad-h2">Funcionalidad de la página</h2>

      <div className="main-content">
        {contacts.map((c) => (
          <div key={c.id} className="section-card" onClick={() => handleClick(c.id)}>
            <div className="card-inner">
              <div className="card-front">
                <img src={c.imagen} alt={c.nombre} style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
              </div>
              <div className="card-back">
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  {c.descripcion.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Principal;
