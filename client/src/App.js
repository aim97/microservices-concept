import 'bootstrap/dist/css/bootstrap.min.css';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

function App() {
  return (
    <div className="App">
      <PostForm />
      <hr />
      <PostList />
    </div>
  );
}

export default App;
