// import './index.css';
import Login from "./components/login";
import Register from "./components/register";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
export default function App(){
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Login />} />
       <Route path="/signup" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  );
}
