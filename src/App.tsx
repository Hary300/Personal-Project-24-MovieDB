import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favorite from './pages/Favorites';
import Detail from './pages/Detail';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/detail' element={<Detail />} />
        <Route path='/favorite' element={<Favorite />} />
      </Routes>
    </>
  );
}

export default App;
