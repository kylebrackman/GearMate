import React, { useContext } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { UserContext } from '../../context/UserContext.tsx';
import RentalCard from './RentalCard.tsx';
import { Rental } from '../../types/models.types.ts';

const PastRentals: React.FC = () => {
  const { user } = useContext(UserContext);

  const pastRentals: Rental[] | undefined = user?.past_rentals;

  console.log(pastRentals);
  return (
    <div>
      <br />
      <Typography variant="h4" gutterBottom>
        Gear You&apos;ve Rented
      </Typography>
      <Grid container spacing={2}>
        {pastRentals && pastRentals.length > 0 ? (
          pastRentals.map((r: Rental) => (
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
            <Typography variant="body1">You have no past rentals.</Typography>
          </Box>
        )}
      </Grid>
    </div>
  );
};

export default PastRentals;
