import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateAlbumPage from './components/createAlbumPage/CreateAlbumPage';
import AlbumDetailPage from './components/albumDetailPage/AlbumDetailPage';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CreateAlbumPage/>} />
          <Route path="/album/:albumName" element={<AlbumDetailPage/>} />
        </Routes>
    </Router>
    </>
  )
}

export default App
