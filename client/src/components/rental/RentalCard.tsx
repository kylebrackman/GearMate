import React from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { User } from '@/types/models.types.ts';

interface RentalCardProps {
  id: number;
  itemName: string;
  image: string;
  price: number;
  description: string;
  end_date: string;
  start_date: string;
  owner: User;
}

const RentalCard: React.FC<RentalCardProps> = ({
  itemName,
  owner,
  end_date,
  start_date,
}) => {
  return (
    <Box sx={{ display: 'flex', maxWidth: 400 }}>
      <CardMedia
        component="img"
        sx={{ width: 100, height: 100, borderRadius: 2 }}
        image="https://via.placeholder.com/100"
        alt="Coventry"
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: 2,
        }}
      >
        <CardContent sx={{ flex: '1 0 auto', padding: '8px 0' }}>
          <Typography variant="h6" component="div">
            {itemName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Owned by {owner.first_name} {owner.last_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {start_date} - {end_date}
          </Typography>
        </CardContent>
      </Box>
    </Box>
  );
};

export default RentalCard;
