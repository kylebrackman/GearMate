import { Route, Routes } from "react-router-dom";
import './App.css'
import Footer from "./components/common/footer";
import Navbar from "./components/common/navbar";
import { UserProvider } from "./context/UserContext";

function App() {

  return (
    <div>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<div>Hello World</div>} />
        </Routes>
        <Footer />
      </UserProvider>
    </div>
  )
}

export default App
