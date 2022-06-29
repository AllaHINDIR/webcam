import './App.css';
import WebcamCapture from './component/Webcamera'
import RecordVideo from './component/WebcameraVideo';
import Navbar from './component/Navbar/Navbar';
import Accueil from './accueil';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="App-body">
          <Routes>
            <Route path='/' element={<Accueil></Accueil>} />
            <Route path='/Image' element={<WebcamCapture></WebcamCapture>} />
            <Route path='/Video' element={<RecordVideo></RecordVideo>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
