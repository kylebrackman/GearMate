import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext.tsx';
import { getPendingRentalRequestByIdApi } from '../../services/RentalRequestApi.ts';
import { RentalRequest } from '../../models/RentalRequestModel.ts';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    // Avatar,
    Divider,
    Box
} from '@mui/material';

const RentalRequestReview = () => {
    const [request, setRequest] = useState<RentalRequest>();
    const { id = '' } = useParams();
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchRequest = async () => {
            const data = await getPendingRentalRequestByIdApi(id);
            setRequest(data);
        };
        fetchRequest();
    }, [id]);

    const navigate = useNavigate();
    const navigateToRenterProfile = () => {
        navigate(`/profiles/${request?.renter.profile.id}`);
    };

    console.log(request)

    const backendBaseUrl = import.meta.env.VITE_API_URL
    const itemImageUrl = `${backendBaseUrl}${request?.item?.image}`;
    // const renterImageUrl = `${backendBaseUrl}${request?.renter.profile.image}`;

    if (!request?.item) {
        return <div>Item not found</div>;
    } else if (user === null) {
        return (
            <Container>
                <Typography variant="h5">Please log in.</Typography>
            </Container>
        );
    } else {
        return (
            <Container sx={{ mt: 5, mb: 5 }}>
                <Grid container spacing={3}>
                    {/* Item Information */}
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="100%"
                                image={itemImageUrl}
                                alt={request.item.name}
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {request.item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {request.item.description}
                                </Typography>
                                <Typography variant="h6" color="primary">
                                    ${request.item.price} Per Day
                                </Typography>
                                <Divider sx={{ marginY: 2 }} />
                                <Typography variant="body2" color="text.secondary">
                                    Condition: {request.item.condition}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Type: {request.item.item_type}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Start Date: {request.start_date}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    End Date: {request.end_date}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Renter Information */}
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h5">Renter Information</Typography>
                                    <Button onClick={navigateToRenterProfile}>View Profile</Button>
                                </Box>
                                <Typography variant="body1">
                                    {request.renter.first_name} {request.renter.last_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Email: {request.renter.email}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Renter Bio: {request.renter.profile?.bio}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ marginTop: 2 }}
                            fullWidth
                            onClick={() => {
                                // Logic to approve the rental request can go here
                            }}
                        >
                            Approve Rental
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        );
    }
};

export default RentalRequestReview;
