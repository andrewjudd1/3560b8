import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

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
  oneImageDate: {
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
  oneImageBubble: {
    order: '1',
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px",
  },
  imageList: {
    display: 'flex',
    gap: '5px',
  },
  imageListItem: {
    display: 'flex',
    position: 'relative',
  },
  image: {
    width: '100px',
    objectFit: 'contain',
    cursor: 'pointer',
    borderRadius: '15px',
    border: '1px solid transparent',
  },
  oneImage: {
    width: '200px',
    objectFit: 'contain',
    cursor: 'pointer',
    borderRadius: '15px',
    border: '1px solid transparent',
  }
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, attachments} = props;
  return (
    <Box className={classes.root}>
      <Typography 
        className={attachments?.length > 1 ? 
        classes.date :
        classes.oneImageDate}>
        {time}
      </Typography>
      <Box 
        className={attachments?.length > 1 ? 
        classes.bubble : 
        classes.oneImageBubble}>
        <Typography className={classes.text}>
          {text}
        </Typography>
      </Box>
      <Box className={classes.imageList}> {
        attachments?.length > 1 ?
          attachments.map((attachment) => (  
            <Box 
              key={attachment}
              className={classes.imageListItem} >
                <img
                  onClick={() => window.open(attachment)}
                  className={classes.image}
                  src={attachment}
                  alt={attachment}/> 
              </Box>)) : 
        attachments?.length > 0 &&
          <Box 
            className={classes.oneImageListItem} >
            <img
              onClick={() => window.open(attachments[0])}
              className={classes.oneImage}
              src={attachments[0]}
              alt={'one'}/> 
          </Box> }
      </Box>
    </Box>
  );
};

export default SenderBubble;
