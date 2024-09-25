import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/UserContext.tsx";
import { Item } from '../../models/ItemModel.tsx';
import EditItemForm from '../../components/item/EditItemForm.tsx';
import { Box, Typography, Divider, Grid, Button } from '@mui/material';
import { orange, red } from '@mui/material/colors';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { Dialog, DialogContent } from '@mui/material';
import Alert from '@mui/material/Alert';
import { getItemApi, deleteItemApi, editItemApi } from '../../services/ItemApi.ts';
import { createRentalRequestApi } from '../../services/RentalRequestApi.ts';
import { RentalRequest } from '../../models/RentalRequestModel.tsx';

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
        console.log(item);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setItem(null);
          console.log("errors here")
          setErrors([error.message]);
        } else {
          setErrors([String(error)]);
        }
      }
    }
    fetchItem();
  }, [id]);
  // const needsStripeConnect = !user?.stripe_connected_account_id
  // const stripeConnectInstance
  const backendUrl = import.meta.env.VITE_API_URL;
  const imageUrl = `${backendUrl}${item?.image}`

  const requestButtonColor = orange[600];
  const deleteItemButtonColor = red[600];
  const navigate = useNavigate();

  const handleNavigateToSignUp = () => {
    navigate('/signup');
  }

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
      console.log("card", rentalRequestData)
      // createCheckoutSession(rentalRequestData);
      try {
        const response = await createRentalRequestApi(rentalRequestData);
        console.log(response);
        navigate(`/confirmRentalRequest/${item.id}`);
      } catch (error) {
        console.log(error)
      }
      // }
    }
  };

  const handleEditItem = async (editedItem: Item): Promise<Item> => {
    try {
      const updatedItem = await editItemApi({
        id: editedItem.id,
        name: editedItem.name,
        description: editedItem.description,
        price: editedItem.price,
        condition: editedItem.condition,
      });
      const newItem = updatedItem;
      setItem(newItem);
      handleClose();
      return newItem;
    } catch (error: any) {
      console.error("Error editing item:", error);
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
    // eslint-disable-next-line
  }, []);

  if (item === null) {
    return (
      <div>Item not found</div>
    )
  } else if (user === null) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#f5f5f5"
        sx={{ maxWidth: '80%', margin: 'auto', borderRadius: '8px', backgroundColor: 'white', mt: 1 }}
      >
        {errors.length > 0 ? (
          <Alert severity="error">
            {errors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </Alert>
        ) : null}

        <Grid container spacing={4} alignItems="center">
          {/* Photo on the right */}
          <Grid item xs={12} sm={6}>
            <Box
              component="img"
              src={imageUrl}
              alt={item.name}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
              }}
            />
          </Grid>
          {/* Item details on the left */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {item.name}
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              <Box component="span" fontWeight="bold">
                ${item.price}
              </Box> /{' '}
              <Box component="span" fontWeight="regular">
                day
              </Box>
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Typography variant="h6" component="h2" gutterBottom>
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {item.description}
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Button variant="contained" sx={{ backgroundColor: requestButtonColor }} onClick={handleNavigateToSignUp}>Sign Up To Rent This Item!</Button>
          </Grid>
        </Grid>
      </Box>
    )
  }

  else {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#f5f5f5"
        sx={{ maxWidth: '80%', margin: 'auto', borderRadius: '8px', backgroundColor: 'white', mt: 1 }}
      >
        <Grid container spacing={4} alignItems="center">
          {/* Photo on the right */}
          <Grid item xs={12} sm={6}>
            <Box
              component="img"
              src={imageUrl}
              alt={item.name}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
              }}
            />
          </Grid>
          {/* Item details on the left */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {item.name}
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              <Box component="span" fontWeight="bold">
                ${item.price}
              </Box> /{' '}
              <Box component="span" fontWeight="regular">
                day
              </Box>
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            {
              user?.id === item.owner_id ? (
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
                    <Button variant="contained" sx={{ backgroundColor: requestButtonColor }} onClick={handleEditButtonClick}>Edit Item</Button>
                    <Button variant="contained" sx={{ backgroundColor: deleteItemButtonColor }} onClick={() => handleDeleteItem(item.id)}>Delete</Button>
                  </div>
                  <Dialog open={openDialog} onClose={handleClose}>
                    <DialogContent sx={{ width: '600px' }}>
                      <EditItemForm item={item} handleEditItem={handleEditItem} errors={errors} />
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
                  <DatePicker sx={{ marginBottom: 2 }} onChange={handleStartDateChange} /> - <DatePicker sx={{ marginBottom: 2 }} onChange={handleEndDateChange} />
                  <Divider sx={{ marginBottom: 2 }} />
                  <Button variant="contained" sx={{ backgroundColor: requestButtonColor }} onClick={handleSubmit}>Request</Button>
                </>
              )
            }
          </Grid>
        </Grid>
      </Box>
    );
  }
};

export default ItemSummary;