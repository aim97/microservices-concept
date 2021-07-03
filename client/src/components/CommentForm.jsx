import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddCommentIcon from '@material-ui/icons/AddComment';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  Button: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CommentForm({ postId }) {
  const classes = useStyles();

  const [comment, setComment] = useState('');

  const submitComment = async () => {
    await axios.post(`http://localhost:4001/posts/${postId}`, {content: comment});
    setComment('');
  }

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        value={comment}
        className={classes.input}
        placeholder="wanna comment ... ?"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={(e) => setComment(e.target.value)}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton color="primary" variant="contained" className={classes.Button} onClick={submitComment}>
        <AddCommentIcon />
      </IconButton>
    </Paper>
  );
};
