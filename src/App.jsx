import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PrivateRoute } from "./components/PrivateRoute.jsx";
import { GuestRoute } from "./components/GuestRoute.jsx";

import Register from './pages/RegisterPage.jsx'
import Login from './pages/LoginPage.jsx'
import Main from './pages/MainPage.jsx'

function App() {
  return (
      <Routes>
        <Route path="/login" element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }/>
        <Route path="/register" element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }/>
        <Route path="/" element={
          <PrivateRoute>
            <Main />
          </PrivateRoute>
        }/>
      </Routes>
  )
}

export default App
