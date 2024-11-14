import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login'
import SignupPage from "./Pages/SignUp"
import Footer from './Components/Footer';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Footer />} />
      </Routes>
    </Router>
  )
}

export default App
