import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Post from './modules/Post';
import Main from './modules/Main';

const App = () => {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="ProxyBandTest/" element={<Main />} />
          <Route path="ProxyBandTest/posts/:id" element={<Post />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
