import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Post from './modules/Post';
import Main from './modules/Main';
import Album from './modules/Album';

const App = () => {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/albums/:id" element={<Album />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
