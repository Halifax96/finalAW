import * as React from "react";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from "@mui/material/Menu";
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { DialogContent, DialogContentText, DialogTitle, Dialog, MenuItem, TextField, Grid } from '@mui/material';
import axios from "axios";
import CardUser from "./cards/cardUser";
import { InputBase} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Footer from './Footer'
// IMP -> Preguntar ¿como recibir datos del Backend?

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "9%",
  maxHeight: "9%",
});


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

//Recibirá por aquí un props de la nota a añadir 
export function AdministradorVista(){
  
  const [users, setUsers] = React.useState([]);
  const [editCopia, setEditCopia] = React.useState([]); //Este hook es para actualizar el grid
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuBusqueda, setMenuBusqueda] = React.useState(false);

  //Variable creada para volver a la pantalla de inicio
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpenDialogNormas = () => {
    setOpen(true);
  }

  const handleCloseDialogNormas = () => {
    setOpen(false);
  }
  
  const handleMenuBusq = () => {
    setMenuBusqueda(true);
  }

  const handleMenuBusqClose = () => {
    setMenuBusqueda(false);
  }

  //Función delvuelve un id de un usuario a partir de un DNI
  function getID(dni){
    console.log("parametro "+dni);
    //Buscamos si existe el dni
    let copia = [...users];
    let count = 0;
    let id = -1;
    for(let i = 0; i<copia.length; i++){
      if(copia[i].dni !== dni) count++;
    }

    //Si count === a la longitud del vector entonces existe el dni si no no
    if(count === copia.length){
      //Aqui implementar la peticion del ID del usuario
      console.log("axios "+dni);
      return axios.get("http://localhost:5000/dni/"+dni)

    }else{
      throw new Error("Error el DNI no existe");
    }

  }

  //Forma de llamar al getID
  getID(12).then(function(response){
    if(response.status === 200){
      //id = response.data.id;    setEstei
      console.log("Todo salio de forma correcta al extraer el id");
    }else{
      console.log("Error al extraer el id ", response.status);
    }
  }).catch((e) => {
      console.error(e);
  });

  //Persistencia de usuarios de la base de datos 
  function usuariosGrid(){
    //Aqui aniadir lo del axios hacer un get con todos los usuers de la base de datos
    axios.get("http://localhost:5000/user")
    .then(function(res, req){
      setUsers(res.data);
      console.log("Recibiendo todos los usuarios");
    });
  }
  //La funcion la usariamos así
  React.useEffect(function(){
    usuariosGrid();
  }, []); //Si no ponemos el array es como si no lo cerraramos

  /*function insertUser(nombre, apellido, direccion, dni, lugarNacimiento, trabajo, descripcionBreve, telefono){
    //Llamar antes a la funcion usuariosGrid para la persistencia de los datos

    // Almaceno la informacion de la nota en el array de cards.
    const copia = [...users];

    //Busco si existe alguna card con un mismo DNI ya que no podrá ser almacenada
    for(let i = 0; i<copia.length; i++){
      if(copia.dni === dni){
        console.error("No puede haber 2 o mas usuarios con un mismo DNI");
      }
    }

    //Insertamos la card
    copia.push({
      nombre: nombre,
      apellido: apellido,
      direccion: direccion,
      dni: dni,
      lugarNacimiento: lugarNacimiento,
      trabajo: trabajo,
      descripcionBreve: descripcionBreve,
      telefono: telefono,
      fechaCreacion: Date.now(),
    });
    setUsers(copia);

    axios.post("http://localhost:5000/user", {nombre: nombre, apellido: apellido, direccion: direccion, dni: dni, lugarNacimiento: lugarNacimiento, trabajo: trabajo, descripcionBreve: descripcionBreve, telefono: telefono, fechaCreacion: Date.now()})
    .then(function(res, req){
      console.log("Todo ha salido bien");
    });
  }*/

  //Me sale el mismo error que antes el 400
  //insertUser("carlos", "prieto", "leon", "7", "leon", "uni", "prog", "uno");

  function removeUser(id){
    //Aqui implementar la peticion de borrado del usuario
    axios.delete("http://localhost:5000/user/"+id)
    .then(function(response){
      if(response.status === 200){
        console.log("Todo salio de forma correcta al borrar el usuario");
        //Aqui implementar la peticion del ID del usuario
        setUsers((cards) => cards.filter(e => e._id !== id));
      }else{
        console.log("Error al borrar al usuario ", response.status);
      }
    });
  }

  //Funcion para actualizar el grid de las cards
  function updateUser(card){    //Esto solo lo podría hacer el usuario
    //Implementar mejor esta forma 
    const copias = [...users];
    const nuevaCopia = copias.map(copia => {
      if(copia.dni === editCopia.dni){
        return {
          nombre: copia.nombre,
          apellido: copia.apellido,
          direccion: copia.direccion,
          dni: copia.dni,
          lugarNacimiento: copia.lugarNacimiento,
          trabajo: copia.trabajo,
          descripcionBreve: copia.descripcionBreve,
          telefono: copia.telefono,
          fechaCreacion: Date.now(),
        }
      }
    });
    setUsers(nuevaCopia);
    //Aqui obtengo el id del usuario
    let id = getID(nuevaCopia.dni);
    //Aquí aniadir para actualizar la base de datos con el axios
    axios.put("http://localhost:5000/user", {
      id: id,
      nombre: nuevaCopia.nombre,
      apellido: nuevaCopia.apellido,
      direccion: nuevaCopia.direccion,
      lugarNacimiento: nuevaCopia.lugarNacimiento,
      trabajo: nuevaCopia.trabajo,
      descripcionBreve: nuevaCopia.descripcionBreve,
      telefono: nuevaCopia.telefono,
      fechaCreacion: Date.now(),
    }).then(function(response){
      console.log("Se modificaron correctamente los cambios");
    });
  }

  return(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "lightskyblue" }}>
        <Toolbar disableGutters>
        <Img
          src={
            "https://static.vecteezy.com/system/resources/thumbnails/004/283/847/small/ia-logo-monogram-emblem-style-with-crown-shape-design-template-free-vector.jpg"
          }
        />

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>

          <Typography
            align="center"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            IntroApp Admin Session
          </Typography>

        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu 
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
            keepMounted
            transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
            <MenuItem onClick={handleMenuBusq}>Buscar Usuario</MenuItem>
            <MenuItem onClick={handleClickOpenDialogNormas}>Normas de la Empresa</MenuItem>
            <MenuItem onClick={ e => navigate("/login") }>LogOut</MenuItem>
        
            <Dialog open={open} onClose={handleCloseDialogNormas}>
                <DialogTitle>
                  Politicas de Privacidad
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    1. Según la ley orgánica del 15/1999 queda totalmente prohibido compartir datos personales de los usuarios.
                  </DialogContentText>
                  <DialogContentText>
                    2. Según la ley orgánica del 5/1992 todo usuario podrá cambiar sus datos si es solicitado.
                  </DialogContentText>
                  <DialogContentText>
                    3. Según la ley orgánica del 3/2018 los usuarios solo podrán ver sus propios datos.
                  </DialogContentText>
                </DialogContent>
            </Dialog>

            <Dialog menuBusqueda={menuBusqueda} onClose={handleMenuBusqClose}>
                <DialogTitle>
                  Buscar un usuario a través de su DNI
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Inserte el DNI
                  </DialogContentText>
                  <TextField>
                    autoFocus
                    margin="dense"
                    id="dniBusq"
                    label="DNI a Buscar"
                    type="email"
                    fullWidth
                    variant="standard"
                  </TextField>
                </DialogContent>
            </Dialog>

          </Menu>

        </Toolbar>
      </AppBar>
    
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item key={user.id}>
            {/*Aqui accederiamos a la clase notas*/}
            <CardUser
              user={user}
              removeUser={removeUser}
              mode="Admin"
            >
            </CardUser>
          </Grid>
        ))}
      </Grid>

      <Footer/>
    </Box>
   
  );
}

export default AdministradorVista;