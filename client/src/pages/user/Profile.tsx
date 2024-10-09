import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/context/UserContext';
// import { ImportMetaEnv } from '@/types/env.types';
// import ProfileMap from '@/components/request/ProfileMap';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
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
  // const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const backendBaseUrl: string = import.meta.env.VITE_API_URL || '';
  const imageUrl: string = `${backendBaseUrl}${user?.profile?.image}`;

  if (!user) {
    return (
      <Box sx={{ mx: '5%', mt: '2%' }}>
        <Grid container spacing={2} sx={{ mt: 5 }}>
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
            <Typography>
              Please log in. If you haven&apos;t create a profile yet, create
              one here:
              <Link href="/createprofile">Create Profile</Link>
            </Typography>
          </Box>
        </Grid>
      </Box>
    );
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
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {/* <ProfileMap /> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
