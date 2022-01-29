import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Box,
  Typography,
} from "@material-ui/core";

 export const useStyles = makeStyles(() => ({
    MainWrapper: {
    height: '100vh',
    overflow: 'hidden',
    
    '@media (max-width: 800px)': {
      display: 'grid',
      gridTemplateColumns: '1fr',
      height: '100vh',
    },
    },
    BackgroundContainer: {
      width: '100%',
      display: 'grid',
    position: 'relative',
    '@media (max-width: 800px)': {
      minWidth: '100vw',
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
      '@media (max-width: 800px)': {
        top: '50px',
      },
      '@media (max-width: 380px)': {
       top: '10px'
      },
    },
    BackgroundBubble: {
      justifySelf: 'center',
    },
    BackgroundText: {
      margin: '50px 0 0 0',
      width: '400px',
      fontFamily: 'Open Sans',
      textAlign: 'center',
      fontSize: '35px',
      lineHeight: '40px',
      color: 'white',
    
      '@media (max-width: 900px)': {
        fontSize: '30px',
        width: '350px',
      },
      '@media (max-width: 800px)': {
        margin: '30px 0 0 0',
      },
      '@media (max-width: 300px)': {
        width: '300px',
        fontSize: '26px',
      },
      
    },
    BackgroundFilter: {
      position: 'absolute',
      background: 'linear-gradient(180deg, #3A8DFF 0%, #86B9FF 100%)',
      opacity: '0.85',
      mixBlendMode: 'normal',
      width: '100%',
      maxHeight: '800px',
      height: '100vh',
      zIndex:'100',
      '@media (max-width: 800px)': {
        height: '30vh',
      },
    },
    BackgroundImage: {
      width: '100%',
      height: '100vh',
      maxHeight: '800px',
      display: 'flex',
      zIndex: '10',
      '@media (max-width: 800px)': {
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
      '@media (max-width: 800px)': {
        gridTemplateColumns: '1fr 1fr',
        minWidth: '100vw',
        height: '40vh',
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
      '@media (max-width: 800px)': {
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
      '@media (max-width: 800px)': {
        gridColumn: '2',
        justifySelf: 'center'
      }
    },
    LoginForm: {
      gridColumn: '1 / span 12',
      justifySelf: 'center',
      '@media (max-width: 800px)': {
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
      margin: '80px 0 20px 0',
      '@media (max-width: 800px)': {
        margin: '20px 0 20px 0',
      }
    },
    FormControl: { 
      position: 'relative',
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
    '@media (max-width: 800px)': {
      margin: '30px 0 20px 0',
    }
    },
    FormForgotPassword: {
      position: 'absolute',
      top: '26px',
      right: '0',
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: '600',
      color: '#3A8DFF',
      fontFamily: 'Open Sans',
      cursor: 'pointer',
    }
    }))

export function SideImageBackground() {
  const classes = useStyles()

  return (
    <Grid className={classes.BackgroundContainerSize} container xs={5}>
        <Box className={classes.BackgroundContainer}>
          <Box className={classes.BackgroundFilter}/>
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
  )
}