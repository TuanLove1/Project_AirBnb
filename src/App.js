import './App.css';
import './index.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { HomeTemplate } from './HomeTemplate';
import { Home } from './pages/HomePage/Home';
import {ListRoom} from "./pages/ListRoomPage/ListRoom"
import { DetailRoom } from './pages/DetailRoom/DetailRoom';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<HomeTemplate />}>
        </Route>
        <Route path='list-room/:id' element={<ListRoom />} />
        <Route path='detail-room/:id' element={<DetailRoom />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
