import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { addItemApi } from '../../services/ItemApi';
import { Item } from '@/types/models.types';
import Alert from '@mui/material/Alert';
import ItemMap from '../../components/maps/ItemMap.tsx';
import { ItemPosition } from '@/types/models.types';

const centerMap = { lat: 27.9881206, lng: 86.9249751 };

const defaultTheme = createTheme();

const UploadItem = () => {
  const [itemName, setItemName] = useState('');
  const [itemType, setItemType] = useState('Select');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('Select');
  const [image, setImage] = useState<File | null>(null);
  const [itemPrice, setItemPrice] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [itemPos, setItemPos] = useState({ lat: 0, lng: 0 });
  // Temporary ts fix below
  // const itemPosition: ItemPosition = { lat: 0, lng: 0 };

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  // const handleSetItemLocation = (itemPosition: ItemPosition) => {
  //     setItemPosition(itemPosition);
  // };

  const handleSetItemPos = (itemPositionInput: ItemPosition) => {
    console.log(itemPositionInput);
    setItemPos(itemPositionInput);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setItemType(event.target.value);
  };

  const handleConditionChange = (event: SelectChangeEvent) => {
    setCondition(event.target.value);
  };

  const addNewItem = async (newItemData: FormData): Promise<Item> => {
    try {
      const newItem = await addItemApi(newItemData);
      // navigate('/home');
      return newItem;
      // Revisit any type
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMessages = error.message.split(',');
        setErrors(errorMessages);
        console.error('Error adding new item:', error);
        throw error;
      } else {
        console.error('Unknown error:', error);
        throw error;
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newItemData = new FormData();

    if (!user) {
      console.error('User is undefined or null.');
      return; // Exit the function early if user is not available
    }

    newItemData.append('name', itemName);
    newItemData.append('owner_id', user.id.toString());
    newItemData.append('item_type', itemType);
    newItemData.append('description', description);
    newItemData.append('condition', condition);
    newItemData.append('price', itemPrice);
    newItemData.append('lat', itemPos.lat.toString());
    newItemData.append('lng', itemPos.lng.toString());

    if (image) {
      newItemData.append('image', image);
    }

    try {
      const response = addNewItem(newItemData);
      console.log(response);
      navigate('/home'); // Navigate on success
    } catch (error) {
      console.error('Error while submitting the form:', error);
      // You could also set an error state here and display a message to the user
    }
  };

  if (user) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main">
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                List Your Item
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  id="itemName"
                  margin="normal"
                  required
                  fullWidth
                  label="Item Name"
                  name="Item Name"
                  autoFocus
                  value={itemName}
                  onChange={(e) => {
                    setItemName(e.target.value);
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Price"
                  label="Price"
                  type="number"
                  id="price"
                  onChange={(e) => setItemPrice(e.target.value)}
                  placeholder="$"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Description"
                  label="Description"
                  id="description"
                  placeholder="Describe what you are listing here."
                  multiline
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  {/* First Select Dropdown */}
                  <Grid item xs={12} sm={6}>
                    <Select
                      fullWidth
                      sx={{ width: '100%' }} // Ensure full width on small screens
                      labelId="item-type-select-label"
                      id="item-type-select"
                      value={itemType}
                      onChange={handleTypeChange}
                      label="Item Type"
                    >
                      <MenuItem value="Select">
                        <em>Select Item Type</em>
                      </MenuItem>
                      <MenuItem value="Hardware">Hardware</MenuItem>
                      <MenuItem value="Winter Sport">Winter Sport</MenuItem>
                      <MenuItem value="Sport (General)">
                        Sport (General)
                      </MenuItem>
                      <MenuItem value="Water Sport">Water Sport</MenuItem>
                      <MenuItem value="Fishing">Fishing</MenuItem>
                      <MenuItem value="Camping">Camping</MenuItem>
                      <MenuItem value="Beach">Beach</MenuItem>
                      <MenuItem value="Climb">Climb</MenuItem>
                      <MenuItem value="Outdoor Game">Outdoor Game</MenuItem>
                    </Select>
                  </Grid>

                  {/* Second Select Dropdown */}
                  <Grid item xs={12} sm={6}>
                    <Select
                      fullWidth
                      sx={{ width: '100%' }} // Ensure full width on small screens
                      labelId="condition-select-label"
                      id="condition-select"
                      value={condition}
                      onChange={handleConditionChange}
                      label="Condition"
                    >
                      <MenuItem value="Select">
                        <em>Select Item Condition</em>
                      </MenuItem>
                      <MenuItem value="New">New</MenuItem>
                      <MenuItem value="Like New">Like New</MenuItem>
                      <MenuItem value="Light Use">Light Use</MenuItem>
                      <MenuItem value="Medium Use">Medium Use</MenuItem>
                      <MenuItem value="Heavy Use">Heavy Use</MenuItem>
                    </Select>
                  </Grid>
                </Grid>

                <label htmlFor="file-upload">
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    // inputProps={{ accept: 'image/*' }}
                    onChange={(e) => {
                      const target = e.target as HTMLInputElement;
                      if (target.files && target.files[0]) {
                        setImage(target.files[0]);
                      }
                    }}
                  />
                </label>
                <Box sx={{ mt: 2 }}>
                  <ItemMap
                    zoom={15}
                    center={centerMap}
                    onUploadItemPage={true}
                    handleSetItemPos={handleSetItemPos}
                  />
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  // onClick={handleSubmit}
                >
                  List Your Item
                </Button>
                {errors.length > 0 && (
                  <Alert severity="error" sx={{ marginBottom: 2 }}>
                    <ul>
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li> // Display each error as a bullet point
                      ))}
                    </ul>
                  </Alert>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url("../../../static-photos/me-climbing.png")',
              backgroundColor: (t) =>
                t.palette.mode === 'light'
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'right',
            }}
          />
        </Grid>
      </ThemeProvider>
    );
  } else {
    return (
      <div>
        <h1>Please Log In or Sign Up</h1>
      </div>
    );
  }
};

export default UploadItem;
