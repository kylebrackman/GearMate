import React, { useContext } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { UserContext } from '../../context/UserContext.tsx';
import RentalCard from './RentalCard.tsx';
import { Rental } from '../../types/models.types.ts';

const CurrentRentals: React.FC = () => {
  const { user } = useContext(UserContext);

  const currentRentals: Rental[] | undefined = user?.current_rentals;

  console.log(currentRentals);
  return (
    <div>
      <br />
      <Typography variant="h4" gutterBottom>
        Current Rentals
      </Typography>
      <Grid container spacing={2}>
        {currentRentals && currentRentals.length > 0 ? (
          currentRentals.map((r: Rental) => (
            <Grid item xs={12} sm={6} md={4} key={r.id}>
              <RentalCard
                itemName={r.item?.name ?? ''}
                image={r.item_image || ''}
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
              You have no current rentals.
            </Typography>
          </Box>
        )}
      </Grid>
    </div>
  );
};

export default CurrentRentals;
