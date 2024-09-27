import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Card,
  CardContent,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
// import ProfileGeo from "./ProfileGeo.jsx";

const Profile: React.FC = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const backendBaseUrl = import.meta.env.VITE_API_URL;
  const imageUrl = `${backendBaseUrl}${user?.profile?.image}`;

  useEffect(() => {
    if (!user) {
      navigate('/signup');
    } else if (!user?.profile) {
      navigate('/createprofile');
    }
  }, [user, navigate]);

  if (!user) {
    return <h1>Please Log In or Sign Up</h1>;
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 3, ml: 20, mr: 20 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 5 }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {user?.profile?.name || 'User Name'}
              </Typography>
              <Box mt={2}>
                <Avatar
                  src={imageUrl}
                  alt={user?.profile?.name || ''}
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
                {user?.profile?.bio || 'Bio goes here...'}
              </Typography>
              <SettingsIcon sx={{ fontSize: 30 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
