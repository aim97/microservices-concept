import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Post from './Post';
import CardDeck from 'react-bootstrap/CardDeck';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4002/').then(res => {
      setPosts(res.data);
      console.log(res.data);
    });
  }, [])

  return (
    <CardDeck>
      {posts.map((post) => <Post key={post.id} postId={post.id} content={post.content} comments={post.comments}/>)}
    </CardDeck>
  )
};

export default PostList;