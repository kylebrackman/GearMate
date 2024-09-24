import React, { useContext } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import { blue, grey } from '@mui/material/colors';
import KayakingIcon from '@mui/icons-material/Kayaking';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import SnowboardingIcon from '@mui/icons-material/Snowboarding';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import SleddingIcon from '@mui/icons-material/Sledding';
import Badge from '@mui/material/Badge';
import { UserContext } from "../../context/UserContext";
import { logoutUserApi } from "../../services/UserApi.ts";

interface SettingActions {
    [key: string]: () => void;
}

const navbarColor = "white";
const headerTextColor = blue[700];
const iconColor = grey[800];
function ResponsiveAppBar() {

    const { user, logoutContext } = useContext(UserContext);

    const navigate = useNavigate();
    const [userMenuTrigger, setUserMenuTrigger] = React.useState<null | HTMLElement>(null);

    const pages = user ? ['Your Rentals', 'List an Item', 'Gear', 'About'] : ['Gear', 'About', 'Login', 'Sign Up'];
    const dropdown = user ? ['Requested Gear', 'Profile', 'Account', 'Dashboard', 'Logout'] : ['Login', 'Sign Up'];
    const backendBaseUrl = import.meta.env.VITE_API_URL
    const imageUrl = `${backendBaseUrl}${user?.profile?.image}`;
    const navBarImage = user && user?.profile?.image ? imageUrl : 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png';

    function handleLogOut() {
        logoutUserApi();
        logoutContext();
    }

    const settingActions: SettingActions = {
        'Sign Up': () => {
            navigate('/signup')
            handleCloseUserMenu();
        },
        Logout: () => handleLogOut(),
        Login: () => {
            handleCloseUserMenu();
            navigate('/login')
        },
        Profile: () => navigate('/profile'),
        Account: () => navigate('/profile'),
        Gear: () => navigate('/home'),
        About: () => navigate('/about'),
        'List an Item': () => navigate('/uploaditem'),
        'Your Rentals': () => navigate('/myRentals'),
        'Requested Gear': () => navigate('/pendingRequests'),

    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setUserMenuTrigger(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setUserMenuTrigger(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: navbarColor }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: "center" }} >
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/home"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: headerTextColor,
                            textDecoration: 'none',
                            fontSize: '1.5rem',
                        }}
                    >
                        GearMate
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', ml: -15 }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => settingActions[page]()}
                                sx={{ my: 2, color: headerTextColor, display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Badge badgeContent={user?.rental_requests_received_pending.length} color="secondary">
                                    <Avatar alt="Remy Sharp" src={navBarImage} />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={userMenuTrigger}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(userMenuTrigger)}
                            onClose={handleCloseUserMenu}
                        >
                            {dropdown.map((option) => (
                                option === 'Requested Gear' ? (
                                    <MenuItem key="Requested Gear" onClick={() => settingActions['Requested Gear']()}>
                                        <Badge
                                            badgeContent={user?.rental_requests_received_pending.length}
                                            color="secondary"
                                            sx={{ display: 'flex' }}
                                        >
                                            <Typography textAlign="center">Requested Gear</Typography>
                                        </Badge>
                                    </MenuItem>
                                ) : (
                                    <MenuItem key={option} onClick={() => settingActions[option]()}>
                                        <Typography textAlign="center">{option}</Typography>
                                    </MenuItem>
                                )
                            ))}
                        </Menu>

                    </Box>
                </Toolbar>
                <Container sx={{ display: 'flex', mb: 2, justifyContent: 'center', alignItems: 'center', color: iconColor }}>
                    <KayakingIcon sx={{ fontSize: 33, mx: 3 }} />
                    <DirectionsBikeIcon sx={{ fontSize: 33, mx: 3 }} />
                    <SnowboardingIcon sx={{ fontSize: 33, mx: 3 }} />
                    <AcUnitIcon sx={{ fontSize: 33, mx: 3 }} />
                    <DownhillSkiingIcon sx={{ fontSize: 33, mx: 3 }} />
                    <SleddingIcon sx={{ fontSize: 33, mx: 3 }} />
                </Container>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;