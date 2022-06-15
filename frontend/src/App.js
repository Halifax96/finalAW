import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

import Login from "./login.js";
import UserNav from "./userSignUp";
import Admin from "./administradorVista";
import UserVista from "./usuarioVista";

export default function App() {
  return (
    <Router>
        <div>
            <Routes>
                <Route path="/" element = {<Navigate to="Login"/>}/>
                <Route path="/login" element = {<Login/>}/>
                <Route path="/Login/userSignUp/:contrasena" element = {<UserNav/>}/>
                <Route path="/Login/administradorVista" element = {<Admin/>}/>
                <Route path="/Login/userSignUp/:contrasena/usuarioVista/:dni" element = {<UserVista/>}/>
            </Routes>
        </div>
    </Router>
  );
}



