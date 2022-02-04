import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { useStyles, SideImageBackground } from "./stylesLoginSingup";
import { login } from "./store/utils/thunkCreators";

const Login = (props) => {
  const classes = useStyles()
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid className={classes.mainWrapper} container >
      <SideImageBackground/>
      <Grid container xs={7}>
        <Grid className={classes.loginContainer} container item >
          <Typography className={classes.loginTopText}>
            Don't have an account?
          </Typography>
          <Button className={classes.loginTopButton} 
            onClick={() => history.push("/register")}>
            Create Account
          </Button>
          <form className={classes.loginForm} 
            onSubmit={handleLogin}>
            <Grid className={classes.formContainer}>
              <Typography className={classes.formTitle} >
                Welcome back!
              </Typography>
              <FormControl className={classes.formControl} 
                margin="normal" required>
                <TextField
                  InputLabelProps={{
                  className: classes.formControlTextArea,
                  }}
                  aria-label="username"
                  label="E-mail address"
                  name="username"
                  type="text"/>
              </FormControl>
              <FormControl className={classes.formControl} 
              margin="normal" required>
                <TextField className={classes.fextFieldTwo}
                InputLabelProps={{
                  className: classes.formControlTextArea,
                  }}
                  label="Password"
                  aria-label="password"
                  type="password"
                  name="password"/>
                <Box className={classes.formForgotPassword}>
                  Forgot?
                </Box>
              </FormControl>
              <Button className={classes.formButton} 
                type="submit" variant="contained" size="large">
                Login
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
