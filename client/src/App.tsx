import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/common/footer';
import Navbar from './components/common/navbar';
import { UserProvider } from './context/UserContext';
import About from './pages/About';
import LogIn from './pages/auth/login';
import SignUp from './pages/auth/signup';
import Home from './pages/Home';
import ItemSummary from './pages/item/ItemSummary';
import UploadItem from './pages/item/UploadItem';
import RentalRequestReview from './pages/requests/RentalRequestReview';
import RequestedItems from './pages/requests/RequestedItems';
import CreateProfile from './pages/user/CreateProfile';
import Profile from './pages/user/Profile';
import RenterProfile from './pages/user/RenterProfile';

function App() {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            <Route path="/pendingRequests" element={<RequestedItems />} />
            <Route
              path="/reviewRequest/:id"
              element={<RentalRequestReview />}
            />
            <Route path="/profiles/:renterId" element={<RenterProfile />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </UserProvider>
      </LocalizationProvider>
    </div>
  );
}

export default App;
