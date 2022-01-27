import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography,} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    margin: '15px 0',
  },
  date: {
    order: '1',
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5,
  },
  OneImageDate: {
    order: '0',
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold",
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px",
    
  },
  OneImageBubble: {
    order: '1',
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px",
  },
  ImageList: {
    display: 'flex',
    gap: '5px',
  },
  ImageListItem: {
    display: 'flex',
    position: 'relative',
  },
  Image: {
    width: '100px',
    objectFit: 'contain',
    cursor: 'pointer',
    borderRadius: '15px',
    border: '1px solid transparent',
  },
  OneImageListItem: {

  },
  OneImage: {
    width: '200px',
    objectFit: 'contain',
    cursor: 'pointer',
    borderRadius: '15px',
    border: '1px solid transparent',
  }
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, attachments } = props;
  return (
    <Box className={classes.root}>
      <Typography 
        className={attachments?.length > 1 ? 
        classes.date :
        classes.OneImageDate}>
        {time}
      </Typography>
      <Box 
        className={attachments?.length > 1 ? 
        classes.bubble : 
        classes.OneImageBubble}>
        <Typography className={classes.text}>
          {text}
        </Typography>
      </Box>
      <Box className={classes.ImageList}> {
        attachments?.length > 1 ?
          attachments.map((attachment, index) => (  
            <Box 
              key={index} 
              className={classes.ImageListItem} >
                <img
                  onClick={() => window.open(attachment)}
                  className={classes.Image}
                  src={attachment}
                  alt={index}/> 
              </Box>)) : 
        attachments?.length > 0 &&
          <Box 
            className={classes.OneImageListItem} >
            <img
              onClick={() => window.open(attachments[0])}
              className={classes.OneImage}
              src={attachments[0]}
              alt={'one'}/> 
          </Box> }
      </Box>
    </Box>
  
  );
};

export default SenderBubble;
