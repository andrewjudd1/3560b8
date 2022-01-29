import React, { useState } from "react";
import {FilledInput, InputLabel, Box, Typography, Button} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import Delete from '@material-ui/icons/Delete';
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15
  },
  imageInputContainer: {
    position: 'relative',
    marginBottom: 20,
    height: 70,
    borderRadius: 8,
    backgroundColor: "#F4F6FA",
  },
  input: {
    position: 'absolute',
    width: '100%',
    height: 70,
    paddingBottom: 15,
    borderRadius: 8,
    backgroundColor: "#F4F6FA",

  },
  imageInputLabel: {
    position: 'absolute',
    right: '10px',
    top: 'calc(50% - 8px)',
    cursor: 'pointer',
  },
  imageInput: { 
    display: 'none'
  },
  imageUploadContainer: {
    display: 'flex',
    width: '100%',
    background: '#F4F6FA',
  },
  imageUploadTopContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageUpload: {
    width: '200px',
  }
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("")
  const [images, setImages] = useState([]); 
  const { postMessage, otherUser, conversationId, user, refresh} = props;
  
  const handleChange = (event) => {
    setText(event.target.value);
  };

  const uploadImage = async (e) => {
    try {
    const file = e.target.files[0]
    const formData = new FormData();
    formData.set('file', file);
    formData.set('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    const response = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
      if (data.secure_url !== '') { 
        const uploadedFileUrl = data.secure_url
        let newImage = uploadedFileUrl
        setImages([...images, newImage])
      }
    } catch (error) {
      console.log(error)
    } 
    }
  const deleteImage = (images, index) => {
   const newArray = images.filter(image=> images.indexOf(image) !== index)
   setImages(newArray)
   
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: images
    };
    await postMessage(reqBody);
    setText("");
    setImages([])
    refresh()
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Box className={classes.imageUploadContainer}>
        {images.map((image, index) => 
          <Box key={image}>
              <Box className={classes.imageUploadTopContainer}>
              <Typography>{`Image${index + 1}:`}
              </Typography>
              <Button onClick={() => deleteImage(images, index)}><Delete/></Button>
              </Box>
              <img className={classes.imageUpload} alt={'upload'} src={image}>
              </img>
          </Box>)}
      </Box>
      <Box className={classes.imageInputContainer}>
        <FilledInput
          className={classes.input}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
        >
        </FilledInput>
        <InputLabel className={classes.imageInputLabel} htmlFor='imageInput'>
          <CropOriginalIcon/>
        </InputLabel>
      </Box>
      <FilledInput
        className={classes.imageInput}
        id='imageInput'
        onChange={uploadImage}
        type="file">
      </FilledInput>
    </form>
  );
};


const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
