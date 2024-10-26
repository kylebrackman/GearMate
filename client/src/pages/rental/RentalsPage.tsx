import { useContext } from 'react';
import { UserContext } from '../../context/UserContext.tsx';
import CurrentRentals from '@/components/rental/CurrentRentals.tsx';
import PastRentals from '@/components/rental/PastRentals.tsx';
import UpcomingRentals from '@/components/rental/UpcomingRentals.tsx';
import Box from '@mui/material/Box';

// import PendingRentals from './PendingRentals.js';

// Recreate structure below, but no need for three different pages
// Just pass user.current/past/upcoming to the same component
const RentalsPage = () => {
  const { user } = useContext(UserContext);

  if (user && user.profile) {
    return (
      <Box sx={{ mx: '5%' }}>
        <div>
          <div>
            <CurrentRentals />
          </div>
          <br />
          <div>
            <UpcomingRentals />
          </div>
          <br />
          <div>
            <PastRentals />
          </div>
        </div>
      </Box>
    );
  } else {
    return (
      <div>
        <h1>Please Log In</h1>
      </div>
    );
  }
};

export default RentalsPage;
