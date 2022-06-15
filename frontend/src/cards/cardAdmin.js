import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import { positions } from '@mui/system';

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

export default function CardAdmin({user, removeUser}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, backgroundColor:'lightblue' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500], positions:'right' }} aria-label="recipe">
            L
          </Avatar>
        }
        title="Añadimos el nombre y el apellido del usuario"
        subheader="Fecha de Nacimiento"
      />
      
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Dirección
        </Typography>
        <Typography variant="body2" color="text.secondary">
          DNI
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Trabajo
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/*Botones de eliminar y editar*/}
        <Button size="small">Elimnar</Button>
        <Button size="small">Editar</Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Descripcion Personal:</Typography>
          <Typography paragraph>
            Aqui pondremos la breve descripcion
          </Typography>
          
        </CardContent>
      </Collapse>
    </Card>
  );
}
