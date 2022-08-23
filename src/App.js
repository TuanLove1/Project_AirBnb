import './App.css';
import './index.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { HomeTemplate } from './templates/HomeTemplate';
import { Home } from './pages/HomePage/Home';
import { ListRoom } from "./pages/ListRoomPage/ListRoom"
import { DetailRoom } from './pages/DetailRoom/DetailRoom';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Information } from './pages/Infomation/Information';
// import { Loading } from './pages/Loading/Loading';
function App() {
  return (
    <BrowserRouter>
      {/* <Loading/> */}
      <Routes>
<<<<<<< HEAD
        {/* RouterHomePlate */}
        <Route path='' element={<HomeTemplate/>}>
          <Route path='home' element={<Home/>} />
          <Route path='about' element={<About/>} />
=======
        <Route path='/' element={<HomeTemplate />}>
          <Route path='' element={<Home/>} />
          <Route path='list-room/:id' element={<ListRoom />} />
          <Route path='detail-room/:id' element={<DetailRoom />} />
          <Route path='information/:id' element={<Information />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
>>>>>>> huutuan
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
