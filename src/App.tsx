import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
// import Favorite from './pages/Favorites';
import Detail from './pages/Detail';
import Search from './pages/Search';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/detail/:movieId' element={<Detail />} />
        <Route path='/search' element={<Search />} />
        {/* <Route path='/favorite' element={<Favorite />} /> */}
      </Routes>
    </>
  );
}

export default App;
