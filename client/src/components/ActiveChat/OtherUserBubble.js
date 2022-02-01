import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    margin: '15px 0',
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6
  },
  usernameDate: {
    order: '1',
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  oneImageDate: {
    order: '0',
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  bubble: {
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "0 10px 10px 10px"
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -0.2,
    padding: 8
  },
  oneImageBubble: {
    order: '1',
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "0 10px 10px 10px"
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

const OtherUserBubble = (props) => {
  const classes = useStyles();
  const { text, time, otherUser, attachments} = props;
  return (
    <Box className={classes.root}>
      <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>
      <Box>
        <Typography className={classes.usernameDate}>
          {otherUser.username} {time}
        </Typography>
        <Box className={attachments?.length > 1 ? 
        classes.bubble : 
        classes.oneImageBubble}>
          {text && <Typography className={classes.text}>{text}</Typography>}
        </Box>
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

export default OtherUserBubble;
