import React from 'react';
import List from '@material-ui/core/List';

import Comment from './Comment';

const CommentList = ({comments = []}) => {
  return (
    <List dense={true}>
      {comments.map((comment) => <Comment key={comment.id} content={comment.content}/>)}
    </List>    
  )
};

export default CommentList;