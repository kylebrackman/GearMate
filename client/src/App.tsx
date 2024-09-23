import { Route, Routes } from "react-router-dom";
import './App.css'
import Footer from "./components/common/footer";
import Navbar from "./components/common/navbar";
import { UserProvider } from "./context/UserContext";
import SignUp from "./pages/auth/signup";
import LogIn from "./pages/auth/login";
import UploadItem from "./pages/item/UploadItem";
import ItemSummary from "./pages/item/ItemSummary";
import Home from "./pages/Home";
import Profile from "./pages/user/Profile";
import CreateProfile from "./pages/user/CreateProfile";

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/createprofile" element={<CreateProfile />} />
        </Routes>
        <Footer />
      </UserProvider>
    </div>
  )
}

export default App