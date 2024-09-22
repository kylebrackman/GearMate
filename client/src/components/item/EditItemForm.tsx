import { useContext, useState } from 'react';
import { UserContext } from "../../context/UserContext.tsx";
import { Item } from '../../models/ItemModel.tsx';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography, Divider, Grid, MenuItem } from '@mui/material';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Alert from '@mui/material/Alert';

interface EditItemFormProps {
    item: Item;
    errors: string[];
    handleEditItem: (editedItem: Item) => void;
}

const EditItemForm: React.FC<EditItemFormProps> = ({ item, handleEditItem, errors }) => {
    const [name, setName] = useState(item.name);
    const [description, setDescription] = useState(item.description);
    const [price, setPrice] = useState(item.price);
    const [condition, setCondition] = useState(item.condition);

    const { id } = item;

    const { user } = useContext(UserContext)


    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const editedItem: Item = {
            id: id,
            name: name,
            description: description,
            price: price,
            condition: condition,
        };
        handleEditItem(editedItem);
    };

    const handleConditionChange = (event: SelectChangeEvent) => {
        setCondition(event.target.value);
    };

    if (user) {
        return (
            <>
                <div className="flex justify-between mb-4">
                    <Typography variant="h6">Edit Item</Typography>
                    <Button variant="contained" onClick={handleSubmit} sx={{ mb: 1 }}>Save</Button>
                </div>
                <Divider sx={{ marginBottom: 2 }} />
                {errors.length > 0 && (
                    <Alert severity="error" sx={{ marginBottom: 2 }}>
                        {errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </Alert>
                )}
                <Grid container direction="row" alignItems="center" spacing={1}>
                    <Grid item xs={3}>
                        <Typography>Item Name:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="name"
                            fullWidth
                            variant="standard"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Description</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="description"
                            name="description"
                            fullWidth
                            variant="standard"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Price</Typography>
                    </Grid>
                    <Grid item xs={9}>
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
                    <Grid item xs={3}>
                        <Typography>Condition</Typography>
                    </Grid>
                    <Grid>
                        <Select
                            fullWidth
                            sx={{ width: { xs: '100%', sm: '100%', md: '300px' } }}  // Adjust width for screen sizes
                            labelId="item-type-select-label"
                            id="item-type-select"
                            value={condition}
                            onChange={handleConditionChange}
                            label="Item Type"
                        >
                            <MenuItem value="Select">
                                <em>Select Item Condition</em>
                            </MenuItem>
                            <MenuItem value="New">New</MenuItem>
                            <MenuItem value="Good">Good</MenuItem>
                            <MenuItem value="Fair">Fair</MenuItem>
                            <MenuItem value="Used">Used</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
            </>
        );
    } else {
        return (
            <div>
                <h1> You must be logged in to edit an item </h1>
            </div>
        );
    }
};

export default EditItemForm;