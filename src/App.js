import './App.css';
import './index.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { HomeTemplate } from './HomeTemplate';
import { Home } from './pages/HomePage/Home';
import {ListRoom} from "./pages/ListRoomPage/ListRoom"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<HomeTemplate />}>
        </Route>
        <Route path='list-room/:id' element={<ListRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
