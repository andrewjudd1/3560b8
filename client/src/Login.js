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
    <Grid className={classes.MainWrapper} container >
      <SideImageBackground/>
      <Grid container xs={7}>
        <Grid className={classes.LoginContainer} container item >
          <Typography className={classes.LoginTopText}>
            Don't have an account?
          </Typography>
          <Button className={classes.LoginTopButton} 
            onClick={() => history.push("/register")}>
            Create Account
          </Button>
          <form className={classes.LoginForm} 
            onSubmit={handleLogin}>
            <Grid className={classes.FormContainer}>
              <Typography className={classes.FormTitle} >
                Welcome back!
              </Typography>
              <FormControl className={classes.FormControl} 
                margin="normal" required>
                <TextField
                  InputLabelProps={{
                  className: classes.FormControlTextArea,
                  }}
                  aria-label="username"
                  label="E-mail address"
                  name="username"
                  type="text"/>
              </FormControl>
              <FormControl className={classes.FormControl} 
              margin="normal" required>
                <TextField className={classes.TextFieldTwo}
                InputLabelProps={{
                  className: classes.FormControlTextArea,
                  }}
                  label="Password"
                  aria-label="password"
                  type="password"
                  name="password"/>
                <Box className={classes.FormForgotPassword}>
                  Forgot?
                </Box>
              </FormControl>
              <Button className={classes.FormButton} 
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
