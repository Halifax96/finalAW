import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function menuBusqueda() {

    const {dni} = useParams();
    const [nombre, setNombre] = React.useState();
    const [apellido, setApellido] = React.useState();
    const [lugarNacimiento, setLuegarNacimiento] = React.useState();
    const [direccion, setDireccion] = React.useState();
    const [telefono, setTelefono] = React.useState();
    const [trabajo, setTrabajo] = React.useState();
    const [descripcionPersonal, setDescripcionPersonal] = React.useState();

    function extraerDatos(){
        axios.get("http://localhost:5000/busqueda/"+dni)
        .then(function(response){
            if(response.status===200){
                setNombre(response.data.nombre);
                setApellido(response.data.apellido);
                setLuegarNacimiento(response.data.lugarNacimiento);
                setDireccion(response.data.direccion);
                setTelefono(response.data.telefono);
                setTrabajo(response.data.trabajo);
                setDescripcionPersonal(response.data.descripcionPersonal);
            }else{
                console.log("Error axios busqueda "+response.status);
            }
        }).catch(function(e){
            console.error(e)
        });
    }

    return(
        <h1>prueba</h1>
    );
}
