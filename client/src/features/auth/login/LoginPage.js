import "./login-page.css";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from '../authApiSlice';
import { useEffect, useState } from "react";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from "@mui/material";

const LoginPage = () => {
  const [login, { isError, error, isLoading, isSuccess, data }] = useLoginMutation()
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess)
      //has token
      navigate("/dash");
  }, [isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const userObject = Object.fromEntries(formData.entries());
    console.log(userObject);
    login(userObject); // Await the login function call
  };
  const handleSubmit1 = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('username'),
      password: data.get('password'),
    });
    const userObject =  Object.fromEntries(data.entries())
    login(userObject); // Await the login function call

  };


  return (
    <div className="login-page">
      <Paper></Paper>
<Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography  variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit1} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              
              <Grid item>
              
              <Typography color={"red"} component="" variant="body1">
              {error && error.data?.message}
          </Typography>
                <Link to={`/register`} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
      {/* <div className="login-page-section">
        <img
          // src={user.image || "/noavatar.png"}
          src={"/noavatar.png"}
          alt=""

        />      
        <form onSubmit={handleSubmit} className="login-page-form">
          <label>Username</label>
          <input type="text" required name="username" id="username" placeholder="user name" />
          <label>Password</label>
          <input type="password" required name="password" id="password" placeholder="password" />
          <button type="submit" disabled={isLoading}>Log in</button>
          {error && error.data?.message}
          <Link to={`/register`} className="quizzes-list-button quizzes-list-view">
                                        sign up
                                    </Link>
          </form>

      </div>

      <div className="login-img">      <h1>Welcome back !</h1>
      </div> */}
    </div>
  );
};

export default LoginPage;
