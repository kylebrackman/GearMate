import React from 'react';
// import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
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
    // const navigate = useNavigate();
  
    // const handleRentClick = () => {
    //   navigate(`/item/${id}`);
    // };
    // const backendUrl = import.meta.env.VITE_API_URL;
    // const imageUrl = `${backendUrl}${image}`;
  
    // const descriptionColor = grey[700];
    return (
        <Card sx={{ display: "flex", maxWidth: 400, boxShadow: 2 }}>
        <CardMedia
          component="img"
          sx={{ width: 100, height: 100, borderRadius: 2 }}
          image="https://via.placeholder.com/100" // Replace with your image URL
          alt="Coventry"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 2 }}>
          <CardContent sx={{ flex: "1 0 auto", padding: '8px 0' }}>
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
      </Card>
    );
  };

export default RentalCard;
