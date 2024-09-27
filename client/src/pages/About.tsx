import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconButton,
  Typography,
  Button,
  Box,
  Container,
  Drawer,
  Divider,
  Grid,
  CardMedia,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const About: React.FC = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleDrawerToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Box>
      {/* Drawer for small screens */}
      <Drawer
        anchor="left"
        open={showMenu}
        onClose={handleDrawerToggle}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            bgcolor: '#2D4263',
          },
        }}
      >
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon sx={{ color: '#fff' }} />
        </IconButton>
        <Divider />
        {/* Add any menu items */}
      </Drawer>

      {/* Hero Section */}
      <Container sx={{ mt: 5, mb: 8 }}>
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              Your Gear
            </Typography>
            <Typography
              variant="h4"
              component="span"
              sx={{ fontWeight: 'light' }}
            >
              Your Passion
              <Box
                component="span"
                sx={{
                  display: 'block',
                  bgcolor: '#FDC221',
                  height: '5px',
                  mt: '-6px',
                  width: '100%',
                }}
              />
              Shared With Others
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Say goodbye to the limitations of traditional department stores
              and embrace the freedom of peer-to-peer gear exchange. Whether
              you're an outdoor enthusiast, a fitness junkie, or a hobbyist
              looking to explore new passions, our platform empowers everyone to
              share their gear and expertise seamlessly.
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 3, bgcolor: '#FDC221' }}
              onClick={() => navigate('/signup')}
            >
              GET STARTED + SIGN UP
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              alt="Home"
              sx={{
                height: 800,
                borderRadius: '50%',
                backgroundImage: 'url("../../static-photos/ChavezBike.png")',
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Developer Section */}
      <Box
        sx={{
          position: 'relative',
          bgcolor: '#ECF7FF',
          pt: 14,
          pb: 14,
          overflow: 'hidden',
        }}
      >
        <Container>
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{ fontWeight: 'bold', mb: 5 }}
          >
            About the Developer
          </Typography>
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                Software Engineer, Climber, Runner, and Outdoor Enthusiast. Kyle
                Brackman has a passion for building and creating, and is excited
                to bring that passion to the GearMate platform. His goal is to
                grow as a developer, build and grow GearMate, and climb 5.14a
                before his 4 year climbing anniversary.
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Proudest Accomplishments: Transitioning to software while
                working full-time, breaking 14:00 for 5k, and overall climbing
                progress.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <CardMedia
                sx={{
                  height: 500,
                  borderRadius: 2,
                  backgroundImage: 'url("../../static-photos/Headshot.png")',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: '#000',
          color: '#fff',
          pt: 5,
          pb: 5,
          mt: 10,
        }}
      >
        <Container>
          <Typography variant="h4" gutterBottom>
            GearMate
          </Typography>
          <Typography variant="body2" maxWidth="sm">
            GearMate, currently in beta and being developed by a solo developer,
            aims to revolutionize the gear rental industry. It strives to offer
            superior quality gear at more accessible prices while fostering a
            sense of community and shared passion among users.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
