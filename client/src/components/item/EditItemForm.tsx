import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext.tsx';
import { Item, Location } from '@/types/models.types.ts';
// import ItemMap from '../maps/ItemMap.tsx';
const existingLocation: Location = {
  id: 1,
  address: '123 Main St',
  latitude: 37.7749,
  longitude: -122.4194,
};

interface EditItemFormProps {
  item: Item;
  errors: string[];
  handleEditItem: (item: Item) => Promise<void>;
}

const EditItemForm: React.FC<EditItemFormProps> = ({
  item,
  handleEditItem,
  errors,
}) => {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [condition, setCondition] = useState(item.condition);
  const { id } = item;
  const { user } = useContext(UserContext);

  //   const centerMap = item?.location
  // ? { lat: item?.location.latitude, lng: item?.location.longitude }
  // : { lat: 27.9881206, lng: 86.9249751 };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const editedItem: Item = {
      id: id,
      name: name,
      description: description,
      price: price,
      condition: condition,
      location: existingLocation,
    };
    try {
      await handleEditItem(editedItem);
    } catch (error) {
      console.error('Error submitting edited item:', error);
    }
  };

  const handleConditionChange = (event: SelectChangeEvent) => {
    setCondition(event.target.value);
  };

  if (user) {
    return (
      <div>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Edit Item
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />

        {errors.length > 0 && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {errors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Item Name"
              required
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Condition</InputLabel>
              <Select
                value={condition}
                onChange={handleConditionChange}
                label="Condition"
              >
                <MenuItem value="New">New</MenuItem>
                <MenuItem value="Like New">Like New</MenuItem>
                <MenuItem value="Good">Good</MenuItem>
                <MenuItem value="Fair">Fair</MenuItem>
                <MenuItem value="Used">Used</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              required
              fullWidth
              multiline
              minRows={3}
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="body1" gutterBottom>
              Price
            </Typography>
            <NumberInput
              value={price}
              onChange={(_event, val) => {
                // Check if val is null or undefined
                if (val === null || val === undefined) {
                  setPrice(0); // Set to zero if null or undefined
                } else {
                  setPrice(val);
                }
              }}
            />
          </Grid>
          {/* <ItemMap item={item} isEditing={true} center={centerMap} zoom={15}/> */}

          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end" marginTop={2}>
              <Button
                variant="contained"
                //eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={handleSubmit}
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'white',
                  paddingX: 4,
                  paddingY: 1,
                  fontSize: '16px',
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return (
      <Typography variant="h6" color="error">
        You must be logged in to edit an item.
      </Typography>
    );
  }
};

export default EditItemForm;
