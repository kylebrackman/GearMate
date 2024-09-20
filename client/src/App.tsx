import { Route, Routes } from "react-router-dom";
import './App.css'
import Footer from "./components/common/footer";
import Navbar from "./components/common/navbar";
function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Hello World</div>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
