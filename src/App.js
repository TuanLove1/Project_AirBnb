import './App.css';
import './index.css';
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom"
import { HomeTemplate } from './HomeTemplate';
import { Home } from './pages/Home';
import { About } from './pages/About';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<HomeTemplate/>}>
          <Route path='about' element={<About/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
