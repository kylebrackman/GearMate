import { Route, Routes } from "react-router-dom";
import './App.css'
import Footer from "./components/common/footer";
import Navbar from "./components/common/navbar";
import { UserProvider } from "./context/UserContext";
import SignUp from "./pages/auth/signup";
import LogIn from "./pages/auth/login";
import Home from "./pages/home";
import UploadItem from "./pages/UploadItem";
import ItemSummary from "./pages/ItemSummary";

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
          <Route path="/uploaditem" element={<UploadItem />} />
          <Route path="/item/:id" element={<ItemSummary />} />
        </Routes>
        <Footer />
      </UserProvider>
    </div>
  )
}

export default App