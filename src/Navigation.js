import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Homepage/Homepage';
import UploadVideos from './pages/UploadVideos/Uploadvideos';
import WatchVideos from './pages/WatchVideos/Watchvideo';

const Navigation = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/uploadvideos' element={<UploadVideos />} />
          <Route path='/watchvideos' element={<WatchVideos />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Navigation;
