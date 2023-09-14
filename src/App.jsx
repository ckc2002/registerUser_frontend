import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from './Components/Home'
import RegisterForm from './Components/RegisterForm';
import { ToastContainer } from 'react-toastify';
import SingleUser from './Components/SingleUser';
import UpdateUser from './Components/UpdateUser';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<RegisterForm />} />
          <Route path="/:id" element={<SingleUser />} />
          <Route path="/edit/:id" element={<UpdateUser />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
