import { useContext } from 'react';
import { UserContext } from '@/context/UserContext.tsx';

// import PendingRentals from './PendingRentals.js';

// Recreate structure below, but no need for three different pages
// Just pass user.current/past/upcoming to the same component
const RentalsPage = () => {
  const { user } = useContext(UserContext);

  if (user && user.profile) {
    return (
      <div>
        <div>
          <div>{/* <CurrentRentals /> */}</div>
          <br />
          <div>{/* <UpcomingRentals /> */}</div>
          <br />
          <div>{/* <PastRentals /> */}</div>
        </div>
      </div>
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
