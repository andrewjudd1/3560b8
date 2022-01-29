import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import {useStyles, SideImageBackground} from './stylesLoginSingup'
import { register } from "./store/utils/thunkCreators";

const Login = (props) => {
  const classes = useStyles()
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
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
          Already have an account?
        </Typography>
        <Button className={classes.LoginTopButton}
          onClick={() => history.push("/login")}>
          Login
        </Button>
        <form className={classes.LoginForm}
          onSubmit={handleRegister}>
          <Grid className={classes.FormContainer}>
            <Typography className={classes.FormTitle} >
              Create an account.
            </Typography>
            <FormControl className={classes.FormControl}>
              <TextField
                InputLabelProps={{
                  className: classes.FormControlTextArea,
                  }}
                aria-label="username"
                label="Username"
                name="username"
                type="text"
                required/>
            </FormControl>
            <FormControl className={classes.FormControl}>
              <TextField
              InputLabelProps={{
                className: classes.FormControlTextArea,
                }}
                label="E-mail address"
                aria-label="e-mail address"
                type="email"
                name="email"
                required/>
            </FormControl>
            <FormControl className={classes.FormControl}>
              <TextField
              InputLabelProps={{
                className: classes.FormControlTextArea,
                }}
                aria-label="password"
                label="Password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="password"
                required/>
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl >
            <FormControl className={classes.FormControl}
              error={!!formErrorMessage.confirmPassword}>
            <TextField
            InputLabelProps={{
              className: classes.FormControlTextArea,
              }}
              label="Confirm Password"
              aria-label="confirm password"
              type="password"
              inputProps={{ minLength: 6 }}
              name="confirmPassword"
              required/>
            <FormHelperText>
              {formErrorMessage.confirmPassword}
            </FormHelperText>
            </FormControl>
            <Button  className={classes.FormButton} 
              type="submit" variant="contained" size="large">
              Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
