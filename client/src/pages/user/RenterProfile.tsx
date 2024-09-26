import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext.tsx';
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Card,
  CardContent,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { getRenterProfileApi } from '../../services/ProfileApi.ts';
import { Profile } from '@/types/models.types.ts';
// import ProfileGeo from "./ProfileGeo.jsx";

const RenterProfile: React.FC = () => {
  const { user } = useContext(UserContext);
  const backendBaseUrl = import.meta.env.VITE_API_URL;
  const [renterProfile, setRenterProfile] = useState<Profile | null>();
  const { renterId } = useParams();

  useEffect(() => {
    const fetchRenterProfile = async (renterId: number) => {
      try {
        const data = await getRenterProfileApi(renterId);
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    if (renterId) {
      const loadProfile = async () => {
        const data = await fetchRenterProfile(Number(renterId));
        setRenterProfile(data);
      };

      loadProfile();
    }
  }, [renterId]);

  if (!user) {
    return <h1>Loading...</h1>;
  } else if (renterProfile === null) {
    return <h1>No renter profile found</h1>;
  }
  return (
    <Box sx={{ flexGrow: 1, padding: 3, ml: 20, mr: 20 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 5 }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {renterProfile?.name || 'User Name'}
              </Typography>
              <Box mt={2}>
                <Avatar
                  src={`${backendBaseUrl}${renterProfile?.image}`}
                  alt={renterProfile?.name || ''}
                  sx={{
                    width: 300,
                    height: 300,
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                />
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                mt={2}
                sx={{ fontSize: 20 }}
              >
                {renterProfile?.bio || 'Bio goes here...'}
              </Typography>
              <SettingsIcon sx={{ fontSize: 30 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RenterProfile;
