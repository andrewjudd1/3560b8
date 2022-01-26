import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { register } from "./store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  MainWrapper: {
  height: '100vh',
  overflow: 'hidden',
  
  '@media (max-width: 700px)': {
    display: 'grid',
    gridTemplateColumns: '1fr',
    height: '50vh',
  },
  },
  BackgroundContainer: {
    width: '100%',
    height: '100vh',
    display: 'grid',
  position: 'relative',
  '@media (max-width: 700px)': {
    minWidth: '100vw',
    height: '30vh',
  },
  
  },
  BackgroundContentContainer: {
    display: 'grid',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'start',
    position: 'absolute',
    top: '200px',
    zIndex: '1000',
    '@media (max-width: 700px)': {
      height: '10vh',
    },
  },
  BackgroundBubble: {
    justifySelf: 'center',
  },
  BackgroundText: {
    margin: '50px 0 0 0',
    width: '300px',
    fontFamily: 'Open Sans',
    textAlign: 'center',
    fontSize: '26px',
    lineHeight: '40px',
    color: 'white',
    '@media (max-width: 700px)': {
      margin: '30px 0 0 0',
    }
  },
  BackgroundFilter: {
    position: 'absolute',
    background: 'linear-gradient(180deg, #3A8DFF 0%, #86B9FF 100%)',
    opacity: '0.85',
    mixBlendMode: 'normal',
    width: '100%',
    maxHeight: '900px',
    height: '100vh',
    zIndex:'100',
    '@media (max-width: 700px)': {
      height: '30vh',
    },
  },
  BackgroundImage: {
    width: '100%',
    height: '100vh',
    maxHeight: '900px',
    display: 'flex',
    zIndex: '10',
    '@media (max-width: 700px)': {
      objectFit: 'cover',
      objectPosition: 'top center',
     width: '100%',
      height: '30vh',
      position: 'absolute',
  
    },
  },
  LoginContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridTemplateRows: '100px 1fr',
    '@media (max-width: 700px)': {
      gridTemplateColumns: '1fr 1fr',
      minWidth: '100vw',
  
    }
  },
  LoginTopText: {
    fontFamily: 'Open Sans',
    gridColumn: '2 / span 8',
    alignSelf: 'center',
    justifySelf: 'end',
    padding: '0 20px',
    fontSize: '14px',
    lineHeight: '19px',
    color: '#B0B0B0',
    '@media (max-width: 700px)': {
      gridColumn: '1',
      justifySelf: 'end',
      textAlign: 'center',
    }
  },
  LoginTopButton: {
    fontFamily: 'Open Sans',
    gridColumn: '10 / span 3',
    minWidth: '160px',
    justifySelf: 'end',
    alignSelf: 'center',
    margin: '0 30px 0 0',
    padding: '15px 25px',
    boxShadow: '0px 2px 12px rgba(74, 106, 149, 0.2)',
    borderRadius: '5px',
    color: '#3A8DFF',
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '19px',
    '&:hover': {
      background: '#3A8DFF',
      color: 'white',
    },
    '@media (max-width: 700px)': {
      gridColumn: '2',
      justifySelf: 'center'
    }
  },
  LoginForm: {
    gridColumn: '1 / span 12',
    justifySelf: 'center',
    '@media (max-width: 700px)': {
      gridColumn: '1 / 3',
      justifySelf: 'center',
      
  
    }
    
  },
  FormContainer: {
    display: 'grid',
    
  },
  FormTitle: {
    fontFamily: 'Open Sans',
    fontWeight: '600',
    fontSize: '26px',
    lineHeight: '40px',
    margin: '60px 0 0px 0',
    '@media (max-width: 700px)': {
      margin: '20px 0 20px 0',
    }
  },
  FormControl: { 
    position: 'relative',
    margin: '20px 0 0 0',
   width: '380px', 
   '@media (max-width: 400px)': {
     width: '300px',
   }
  },
  FormControlTextArea: {
    color: '#B0B0B0',
    fontSize: '14px',
    lineHeight: '19px',
    "&.Mui-focused": {
      fontFamily: 'Open Sans',
      fontSize: '14px',
      lineHeight: '19px',
      color: "#B0B0B0"
    }
  },
  TextFieldTwo: {
    margin: '20px 0 0 0',
  },
  FormButton: {
  fontFamily: 'Open Sans',
  padding: '12px 55px',
  justifySelf: 'center',
  borderRadius: '3px',
  background: '#3A8DFF',
  color: 'white',
  margin: '50px 0 0 0',
  '&:hover': {
    background: 'white',
    color: '#3A8DFF',
  },
  '@media (max-width: 700px)': {
    margin: '30px 0 20px 0',
  }
  
  },
  
  FormForgotPassword: {
    position: 'absolute',
    top: '45px',
    right: '0',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '600',
    color: '#3A8DFF',
    fontFamily: 'Open Sans',
    cursor: 'pointer',
  }
  
  
  }))

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
      <Grid className={classes.BackgroundContainerSize} container xs={5}>
        <Box className={classes.BackgroundContainer}>
          <Box className={classes.BackgroundFilter}></Box>
          <Box className={classes.BackgroundContentContainer}>
          <img className={classes.BackgroundBubble} 
          src='./assets/bubble.svg' alt='bubble'>
          </img>
          <Typography className={classes.BackgroundText}>
            Converse with anyone with any language
            </Typography>
          </Box>
          <img className={classes.BackgroundImage} 
          src='./assets/bg-img.png' alt='bg-img'>
          </img>
        </Box>
      </Grid>
      <Grid container xs={7}>
      <Grid className={classes.LoginContainer} container item >
      <Typography className={classes.LoginTopText}>
              Already have an account?
              </Typography>
          <Button className={classes.LoginTopButton}
          onClick={() => history.push("/login")}>Login</Button>
        
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
                  required
                />
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
                  required
                />
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
                  required
                />
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
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            
            <Button  className={classes.FormButton} type="submit" variant="contained" size="large">
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
