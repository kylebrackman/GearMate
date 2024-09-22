import { Route, Routes } from "react-router-dom";
import './App.css'
import Footer from "./components/common/footer";
import Navbar from "./components/common/navbar";
import { UserProvider } from "./context/UserContext";
import SignUp from "./pages/signup";
import LogIn from "./pages/login";
import Home from "./pages/home";

function App() {

  return ( 
    <div>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        <Footer />
      </UserProvider>
    </div>
  )
}

export default App
