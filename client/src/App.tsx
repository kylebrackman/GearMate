import { Route, Routes } from "react-router-dom";
import './App.css'
import Footer from "./components/common/footer";
import Navbar from "./components/common/navbar";
import { UserProvider } from "./context/UserContext";
import SignUp from "./pages/Signup";

function App() {

  return (
    <div>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<div>Hello World</div>} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </UserProvider>
    </div>
  )
}

export default App
