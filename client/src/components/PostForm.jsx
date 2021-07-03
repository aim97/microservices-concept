import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Typography, Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlgin: "left",
    padding: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

const PostForm = () => {
  const [content, setContent] = useState('');

  const classes = useStyles();

  const newPostHandler = async (e) => {
    e.preventDefault();

    // create new post
    await axios.post('http://localhost:4000/', {content});
    setContent('');
  };

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={newPostHandler}>
      <Typography variant='h5'>Create a Post</Typography>
      <TextField 
        id="content" 
        fullWidth 
        value={content}
        label="Content" 
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        placeholder="Hello world!."
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type='submit' variant="contained" fullWidth color="primary">Submit</Button>
    </form>
  );
};

export default PostForm;