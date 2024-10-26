import React, { useContext } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { UserContext } from '../../context/UserContext.tsx';
import RentalCard from './RentalCard.tsx';
import { Rental } from '../../types/models.types.ts';

const UpcomingRentals: React.FC = () => {
  const { user } = useContext(UserContext);

  const upcomingRentals: Rental[] | undefined = user?.upcoming_rentals;

  console.log(upcomingRentals);
  return (
    <div>
      <br />
      <Typography variant="h4" gutterBottom>
        Upcoming Rentals
      </Typography>
      <Grid container spacing={2}>
        {upcomingRentals && upcomingRentals.length > 0 ? (
          upcomingRentals.map((r: Rental) => (
            <Grid item xs={12} sm={6} md={4} key={r.id}>
              <RentalCard
                itemName={r.item?.name ?? ''}
                image={r.item?.image || ''}
                description={r.item?.description ?? ''}
                id={r.item?.id ?? 0}
                price={r.item?.price ?? 0}
                end_date={r.end_date ?? ''}
                start_date={r.start_date ?? ''}
                owner={r.owner}
              />
            </Grid>
          ))
        ) : (
          <Box sx={{ mx: '1%', mt: '1%' }}>
            <Typography variant="body1">
              You have no upcoming rentals.
            </Typography>
          </Box>
        )}
      </Grid>
    </div>
  );
};

export default UpcomingRentals;
