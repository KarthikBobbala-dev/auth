
import './App.css'
import UserRegister from './Components/UserRegister'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'

function App() {
 return (
  <>
  <Routes>
    <Route path="/" element={<Navigate to="/register" replace />} />
    <Route path="/register" element={<UserRegister/>} />
    <Route path="/login" element={<Login/>} />
    <Route path='/dashboard' element={<Dashboard/>}/>
  </Routes>
  </>
 )
}

export default App
