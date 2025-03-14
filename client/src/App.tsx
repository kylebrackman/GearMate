import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Footer from './components/common/footer';
import Navbar from './components/common/navbar';
import { UserProvider } from './context/UserContext';
import SignUp from './pages/auth/signup';
import LogIn from './pages/auth/login';
import UploadItem from './pages/item/UploadItem';
import ItemSummary from './pages/item/ItemSummary';
import Home from './pages/Home';
import Profile from './pages/user/Profile';
import CreateProfile from './pages/user/CreateProfile';
import RequestedItems from './pages/request/RequestedItems';
import RentalRequestReview from './pages/request/RentalRequestReview';
import RentalsPage from './pages/rental/RentalsPage';
import RenterProfile from './pages/user/RenterProfile';
import About from './pages/About';
import SearchResults from './pages/item/SearchResults';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const defaultTheme = createTheme();
function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
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
            <Route path="/myRentals" element={<RentalsPage />} />
            <Route path="/profiles/:renterId" element={<RenterProfile />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
          <Footer />
        </UserProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
