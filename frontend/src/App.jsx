import { Routes, Route } from 'react-router';
import Home from './routes/Home';
import List from './routes/List';
import Add from './routes/Add';
import NotFound from './routes/NotFound';
import Welcome from './components/Welcome';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index path="home" element={<Welcome />} />
        <Route path="list" element={<List />} />
        <Route path="add" element={<Add />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
