import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { DialogContent, DialogContentText, DialogTitle, Dialog } from '@mui/material';
import Footer from "./Footer"

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "15%",
  maxHeight: "15%",
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.unileon.es/">
        IntroApp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
   
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('usuario'),
      password: data.get('contra'),
    });

    if( data.get('usuario') === "admin" && data.get('contra') === "admin"){
      let user = navigate("./administradorVista");
    }else{
      let user = navigate("./userSignUp/" + data.get('contra'));
    }
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Img
              src={
                "https://static.vecteezy.com/system/resources/thumbnails/004/283/847/small/ia-logo-monogram-emblem-style-with-crown-shape-design-template-free-vector.jpg"
              }
            />
            <Typography component="h1" variant="h5">
              Bienvenido a IntroApp
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="usuario"
                label="Email Address"
                name="usuario"
                autoComplete="usuario"
                variant="standard"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="contra"
                label="contraseña"
                type="password"
                id="contra"
                autoComplete="current-password"
                variant="standard"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "lightblue" }}
              >
                ENTRAR
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" onClick={handleClickOpen}>
                    Contacta con nosotros
                  </Link>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                      Contacta con nosotros
                    </DialogTitle>
                    <DialogContentText>
                      contacto@introapp.es
                    </DialogContentText>
                  </Dialog>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
       </Grid>
      <Footer/>
    </ThemeProvider>
  );
}