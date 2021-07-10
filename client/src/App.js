import 'bootstrap/dist/css/bootstrap.min.css';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <div className="App">
      <PostForm />
      <hr />
      <Container>
        <PostList />
      </Container>
    </div>
  );
}

export default App;
