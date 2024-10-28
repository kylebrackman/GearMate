import React, { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import ItemCard from '@/components/item/ItemCard';
import { Box, Grid, Typography, Avatar, CardContent } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const Profile: React.FC = () => {
  const { user } = useContext(UserContext);

  const backendBaseUrl: string = import.meta.env.VITE_API_URL || '';
  const imageUrl: string = `${backendBaseUrl}${user?.profile?.image}`;

  console.log(user?.owned_items);

  if (!user) {
    return (
      <Grid container spacing={2} sx={{ mt: 5 }}>
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
          <Typography>
            Please log in. If you haven&apos;t create a profile yet, create one
            here:
            <Link href="/createprofile">Create Profile</Link>
          </Typography>
        </Box>
      </Grid>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 3, ml: 20, mr: 20 }}>
      <Grid container spacing={3}>
        {/* Left Side: Profile Info */}
        <Grid item xs={12} md={8}>
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
        </Grid>

        {/* Right Side: Owned Items in a Single Column */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {user?.owned_items.map((i) => (
              <Grid key={i.id}>
                <ItemCard
                  id={i.id}
                  name={i.name}
                  image={i.image ?? ''}
                  description={i.description}
                  price={i.price}
                  key={i.id}
                />
              </Grid>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
