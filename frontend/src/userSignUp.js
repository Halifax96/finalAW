import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import TextField from "@mui/material/TextField";
import { DialogContent, DialogContentText, DialogTitle, Dialog } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import Footer from './Footer';
import styled from "@emotion/styled";



const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "9%",
  maxHeight: "9%",
});



export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const {contrasena} = useParams();
  const [nombre, setNombre] = React.useState();
  const [apellido, setApellido] = React.useState();
  const [lugarNacimiento, setLuegarNacimiento] = React.useState();
  const [direccion, setDireccion] = React.useState();
  const [telefono, setTelefono] = React.useState();
  const [dni, setDni] = React.useState();
  const [trabajo, setTrabajo] = React.useState();
  const [descripcionPersonal, setDescripcionPersonal] = React.useState();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //Variabeles y funciones para añadir un botón
  const [open, setOpen] = React.useState(false);
  const handleClickOpenButton = () => {
    setOpen(true);
  }
  const handleCloseButton = () => {
    setOpen(false);
  }
  //Variable creada para volver a la pantalla de inicio
  const navigate = useNavigate();

  function insertarUsuario(){
    //Aqui verificamos que el DNI insertado no corresponde con ninguno de la base de datos
    /*axios.post("http://localhost:5000/dni")   Revisar Backend
    .then(function(response){
     if(response.status===200){
        if(response.data==="DNI encontrado en la base de datos"){
          window.confirm("No se puede insertar un usuario");
          //Cambiamos de ventana
          navigate("/login");
        }else{
          navigate("./usuarioVista");
        }
      }else{
        console.log("Error al insertar el usuario "+response.status);
      }
    }).catch((e) => {
      console.error(e);
    });*/
    //Aqui insertamos al usuario
    axios.post("http://localhost:5000/user", {nombre: nombre, apellido: apellido, direccion: direccion, dni: dni, lugarNacimiento: lugarNacimiento, trabajo: trabajo, descripcionPersonal: descripcionPersonal, telefono: telefono, fechaCreacion: Date.now(), contrasena:contrasena})
    .then(function(response){
      if(response.status===200){
        console.log("Todo ha salido bien usuario insertado de forma correcta en la base de datos");
      }else{
        console.log("Error al insertar el usuario "+response.status);
      }
    }).catch((e) => {
      console.error(e);
    });
    navigate("./usuarioVista/"+dni);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "lightblue" }} >
        <Toolbar disableGutters>
          <Img
            src={
              "https://static.vecteezy.com/system/resources/thumbnails/004/283/847/small/ia-logo-monogram-emblem-style-with-crown-shape-design-template-free-vector.jpg"
            }
          />


          <Typography
            align="center"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            IntroApp
          </Typography>
          {auth && (
            <div>
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
                <MenuItem onClick={ e => navigate("/login") }>logout</MenuItem>
                <MenuItem onClick={ handleClickOpenButton }>Normas Empresa</MenuItem>

                <Dialog open={open} onClose={handleCloseButton}>
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

              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        disable
      >

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            label="Nombre"
            id="standard-start-adornment"
            sx={{ m: 1, width: "25ch" }}
            variant="standard"          
            onChange={(e) => {setNombre(e.target.value)}}
          />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            label="Apellidos"
            id="standard-start-adornment"
            sx={{ m: 1, width: "25ch" }}
            variant="standard"
            onChange={(e) => {setApellido(e.target.value)}}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            variant="standard"
            sx={{ m: 1, width: "25ch" }}
            id="outlined-required"
            label="Dirección"
            onChange={(e) => {setDireccion(e.target.value)}}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            variant="standard"
            sx={{ m: 1, width: "25ch" }}
            id="outlined-required"
            label="Trabajo"
            onChange={(e) => {setTrabajo(e.target.value)}}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            variant="standard"
            sx={{ m: 1, width: "25ch" }}
            id="outlined-required"
            label="Número Teléfono"
            onChange={(e) => {setTelefono(e.target.value)}}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            variant="standard"
            sx={{ m: 1, width: "25ch" }}
            id="outlined-required"
            label="Lugar nacimiento"
            onChange={(e) => {setLuegarNacimiento(e.target.value)}}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            variant="standard"
            sx={{ m: 1, width: "25ch" }}
            id="outlined-required"
            label="DNI"
            onChange={(e) => {setDni(e.target.value)}}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            variant="outlined"
            id="outlined-basic"
            sx={{ width: "60ch"}}
            label="Descripción Personal"
            onChange={(e) => {setDescripcionPersonal(e.target.value)}}
            multiline
            rows={5}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'right'}} marginBottom={2} marginRight={2}>

          <Button 
            variant="contained" 
            endIcon={<SendIcon />}  
            sx={{ mt: 3, ml: 1 }} 
            onClick={e => insertarUsuario()}
          >
            Send
          </Button>
        </Box>
        <Footer/>
      </Box>
    </Box>

  );
}
