import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardUser({ user, removeUser, editUser, mode}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
      <Box sx={{ flexGrow: 1 }} margin={2}>
        <Card sx={{ maxWidth: 300 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Aquí hay que insertar el nombre de usuario"
            subheader = "Insertar fecha aquí"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Nombre: <br/>
              Apellido: <br/>
              Dirección postal: <br/>
              Trabajo: <br/>
              Número Teléfono: <br/>
              Lugar de nacimiento:  <br/>
              DNI: <br/>
              Descripción personal: <br/>
            </Typography>
          </CardContent>
          <Button>Editar</Button>
          <Button>Eliminar</Button>
        </Card>
       
      </Box>
  );
}
