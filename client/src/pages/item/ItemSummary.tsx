import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext.tsx';
import EditItemForm from '../../components/item/EditItemForm.tsx';
import { Box, Typography, Divider, Grid, Button } from '@mui/material';
import { orange, red } from '@mui/material/colors';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { Dialog, DialogContent } from '@mui/material';
import ItemMap from '../../components/maps/ItemMap.tsx';
// import Alert from '@mui/material/Alert';
import {
  getItemApi,
  deleteItemApi,
  editItemApi,
} from '../../services/ItemApi.ts';
import { createRentalRequestApi } from '../../services/RentalRequestApi.ts';
import { Item, RentalRequest } from '@/types/models.types.ts';

// import useStripeConnect from '../../hooks/useStripeConnect.js';
// import { createStripeId } from '../../services/StripeApi.ts';

const ItemSummary = () => {
  const { user } = useContext(UserContext);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [item, setItem] = useState<Item | null>(null);

  const { id } = useParams();
  const itemId = id ?? '';

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const item = await getItemApi(itemId);
        setItem(item);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setItem(null);
          console.log('errors here');
          setErrors([error.message]);
        } else {
          setErrors([String(error)]);
        }
      }
    };
    void fetchItem();
  }, [itemId]);

  // const needsStripeConnect = !user?.stripe_connected_account_id
  // const stripeConnectInstance
  const backendUrl = import.meta.env.VITE_API_URL;
  const imageUrl = `${backendUrl}${item?.image}`;

  const requestButtonColor = orange[600];
  const deleteItemButtonColor = red[600];
  const navigate = useNavigate();

  const handleNavigateToSignUp = () => {
    navigate('/signup');
  };

  const centerMap = item?.location
    ? { lat: item?.location.latitude, lng: item?.location.longitude }
    : { lat: 27.9881206, lng: 86.9249751 };

  console.log(item);

  const handleStartDateChange = (value: Dayjs | null) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value: Dayjs | null) => {
    setEndDate(value);
  };

  const handleDeleteItem = async (itemId: number) => {
    try {
      await deleteItemApi(itemId);
      setItem(null);
      navigate('/home');
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        setErrors([error.message]);
      } else {
        setErrors([String(error)]);
      }
    }
  };

  const handleSubmit = async () => {
    // Write logic to stop the user from being able to press this button twice, so they can't click while it's loading...

    // Possible stripe flow here: ...
    // e.preventDefault();
    // let stripeId;
    // if (needsStripeConnect) {
    //   stripeId = await createStripeId();
    // } else {
    //   stripeId = user?.stripe_connected_account_id
    // }

    // console.log(stripeId)
    // handleClose();

    // useStripeSession.purchase(amount)
    //   else {
    if (item && user) {
      const rentalRequestData: RentalRequest = {
        start_date: startDate ? startDate.format('YYYY-MM-DD') : '',
        end_date: endDate ? endDate.format('YYYY-MM-DD') : '',
        renter: user,
        item: item,
        owner_id: item.owner_id,
      };
      console.log('card', rentalRequestData);
      // createCheckoutSession(rentalRequestData);
      try {
        const response: RentalRequest =
          await createRentalRequestApi(rentalRequestData);
        console.log(response);
        navigate(`/confirmRentalRequest/${item.id}`);
      } catch (error) {
        console.log(error);
      }
      // }
    }
  };

  const handleEditItem = async (editedItem: Item) => {
    try {
      const updatedItem = await editItemApi({
        id: editedItem.id,
        name: editedItem.name,
        description: editedItem.description,
        price: editedItem.price,
        condition: editedItem.condition,
      });
      const newItem = updatedItem;
      console.log(newItem);
      setItem(newItem);
      handleClose();
    } catch (error: unknown) {
      console.error('Error editing item:', error);
      throw error;
    }
  };

  const handleEditButtonClick = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    // resetErrors();
  }, []);

  if (item === null) {
    return <div>Item not found</div>;
  } else {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#f5f5f5"
        sx={{
          maxWidth: '80%',
          margin: 'auto',
          borderRadius: '8px',
          backgroundColor: 'white',
          mt: 1,
        }}
      >
        <Grid container spacing={4} alignItems="center">
          {/* Photo on the right */}
          <Grid
            sx={{ mt: 2, alignContent: 'center', mb: 3 }}
            item
            xs={12}
            sm={6}
          >
            <Box
              component="img"
              src={imageUrl}
              alt={item.name}
              sx={{
                width: 'auto',
                height: {
                  xs: '200px', // Full width on extra small screens (mobile)
                  sm: '200px', // Full width on small screens
                  md: '300px', // 80% width on medium screens
                  lg: '300px', // 70% width on large screens
                  xl: '400px', // 60% width on extra large screens
                },
                borderRadius: '8px',
              }}
            />
          </Grid>
          {/* Item details on the left */}
          <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {item.name}
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              <Box component="span" fontWeight="bold">
                ${item.price}
              </Box>{' '}
              /{' '}
              <Box component="span" fontWeight="regular">
                day
              </Box>
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            {user?.id === item.owner_id ? (
              <>
                <Typography variant="h6" component="h2" gutterBottom>
                  <Box component="span" fontWeight="bold">
                    Owner:
                  </Box>{' '}
                  <Box component="span" fontWeight="regular">
                    You!
                  </Box>
                </Typography>

                <Typography variant="h6" component="h2" gutterBottom>
                  <Box component="span" fontWeight="bold">
                    Condition:
                  </Box>{' '}
                  <Box component="span" fontWeight="regular">
                    {item.condition}
                  </Box>
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {item.description}
                </Typography>
                <br />
                <Divider sx={{ marginBottom: 2 }} />
                <div className="flex justify-between mb-4">
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: requestButtonColor, mr: 3 }}
                    onClick={handleEditButtonClick}
                  >
                    Edit Item
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: deleteItemButtonColor }}
                    onClick={() => void handleDeleteItem(item.id)}
                  >
                    Delete
                  </Button>
                </div>
                <Dialog open={openDialog} onClose={handleClose}>
                  <DialogContent sx={{ width: '600px' }}>
                    <EditItemForm
                      item={item}
                      handleEditItem={handleEditItem}
                      errors={errors}
                    />
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <>
                <Typography variant="h6" component="h2" gutterBottom>
                  <Box component="span" fontWeight="bold">
                    Owner:
                  </Box>{' '}
                  <Box component="span" fontWeight="regular">
                    {item.owner_first_name} {item.owner_last_name}
                  </Box>
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {item.description}
                </Typography>
                <Box component="span" fontWeight="bold">
                  Pick Your Dates
                </Box>
                <br />
                <DatePicker
                  sx={{ marginBottom: 2 }}
                  onChange={handleStartDateChange}
                />{' '}
                -{' '}
                <DatePicker
                  sx={{ marginBottom: 2 }}
                  onChange={handleEndDateChange}
                />
                <Divider sx={{ marginBottom: 2 }} />
                {user == null ? (
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: requestButtonColor }}
                    onClick={handleNavigateToSignUp}
                  >
                    Sign Up!
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: requestButtonColor }}
                    onClick={() => void handleSubmit()}
                  >
                    Request
                  </Button>
                )}
              </>
            )}
            <Typography sx={{ mt: 2 }}>Location</Typography>
            <ItemMap
              center={centerMap}
              zoom={15}
              item={item}
              user={user ?? undefined}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
};

export default ItemSummary;
