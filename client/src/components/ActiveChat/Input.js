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
  
  ImageInputContainer: {
    position: 'relative',
    marginBottom: 20,
    height: 70,
    borderRadius: 8,
    backgroundColor: "#F4F6FA",


  },
 
  Input: {
    position: 'absolute',
    width: '100%',
    height: 70,
    paddingBottom: 15,
    borderRadius: 8,
    backgroundColor: "#F4F6FA",

  },
  ImageInputLabel: {
    position: 'absolute',
    right: '10px',
    top: 'calc(50% - 8px)',
    cursor: 'pointer',
  },
  ImageInput: { 
    display: 'none'
  },
  ImageUploadContainer: {
    display: 'flex',
    width: '100%',
    background: '#F4F6FA',
  },
  ImageUploadTopContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ImageUpload: {
    width: '200px',
  }
}));

const Input = (props) => {
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/andrew-judd/image/upload'
  const CLOUDINARY_UPLOAD_PRESET = 'oxzlmelj'
  const classes = useStyles();
  const [text, setText] = useState("")
  const [images, setImages] = useState([]); 
  const { postMessage, otherUser, conversationId, user, refresh} = props;
  
  const handleChange = (event) => {
    setText(event.target.value);
  };

  const uploadImage = (e) => {
    const file = e.target.files[0]
    console.log(file)
    const formData = new FormData();
    formData.set('file', file);
    formData.set('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    console.log(formData.get('upload_preset'))

    fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.secure_url !== '') {
        
        const uploadedFileUrl = data.secure_url
        console.log(uploadedFileUrl)
        let newImage = uploadedFileUrl
        console.log(newImage)
        
        setImages([...images, newImage])
      }
      
    }).catch(err => console.log(err))

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
      <Box className={classes.ImageUploadContainer}>
        {images.map((image, index) => 
          <Box key={index}>
              <Box className={classes.ImageUploadTopContainer}>
              <Typography>{`Image${index + 1}:`}
              </Typography>
              <Button onClick={() => deleteImage(images, index)}><Delete/></Button>
              </Box>
              <img className={classes.ImageUpload} alt={'upload'} src={image}>
              </img>
          </Box>)}
      </Box>
      <Box className={classes.ImageInputContainer}>
        <FilledInput
          className={classes.Input}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
        >
        </FilledInput>
        <InputLabel className={classes.ImageInputLabel} htmlFor='imageInput'>
          <CropOriginalIcon/>
        </InputLabel>
      </Box>
      <FilledInput
        className={classes.ImageInput}
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
