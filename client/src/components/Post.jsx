import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import CommentList from './CommentList';
import CommentForm from './CommentForm';

const useStyles = makeStyles({
  root: {
    margin: 5,
    maxWidth: 345,
    flexDirection: 'column',
    display: 'flex'
  },
  grow: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    width: '100%'
  }
});

export default function Post({ postId, content, comments }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.grow}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="150"
          image={`https://picsum.photos/seed/${postId}/500`}
          title="Random pic"
        />
        <CardContent className={classes.grow}>
          <Typography gutterBottom variant="h6" component="h2">
             {content}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="div">
            <CommentList comments={comments}/>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <CommentForm postId={postId}/>
      </CardActions>
    </Card>
  );
}