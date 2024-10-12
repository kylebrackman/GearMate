import React, { useState } from 'react';
import { Grid, TextField, Button, Box } from '@mui/material';
import { searchItemsApi } from '../../services/SearchApi';

// Define the possible field names as a union type
type SearchField = 'location' | 'name' | 'dateFrom' | 'dateTo';

const SearchBar: React.FC = () => {
  // State to track which field is currently focused
  const [focusedField, setFocusedField] = useState<SearchField | null>(null);
  const [searchParams, setSearchParams] = useState({
    name: '',
    location: '',
    dateFrom: '',
    dateTo: '',
  });

  // Set the focused field on focus event
  const handleFocus = (field: SearchField) => {
    setFocusedField(field);
  };

  // Clear the focused field on blur event
  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSearch = async () => {
    try {
      console.log(searchParams);
      const results = await searchItemsApi(searchParams);
      console.log(results);
    } catch (error) {
      console.error('Error searching items:', error);
    }
  };

  const handleInputChange =
    (field: SearchField) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchParams((prevParams) => ({
        ...prevParams,
        [field]: event.target.value,
      }));
    };

  // Helper function to check if a field should be dimmed
  const isDimmed = (field: SearchField): boolean => {
    return focusedField !== null && focusedField !== field;
  };

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: '50px',
        display: 'flex',
        alignItems: 'center',
        mt: 3,
        mx: '25%',
        boxShadow: 5,
      }}
    >
      <Grid container spacing={2} alignItems="center">
        {/* Name Field */}
        <Grid item xs={12} sm={3}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            onFocus={() => handleFocus('name')}
            onBlur={handleBlur}
            sx={{
              backgroundColor: isDimmed('name') ? '#e0e0e0' : 'white',
              transition: 'background-color 0.3s ease',
            }}
            color="success"
            onChange={handleInputChange('name')}
          />
        </Grid>
        {/* Location Field */}
        <Grid item xs={12} sm={3}>
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            onFocus={() => handleFocus('location')}
            onBlur={handleBlur}
            color="success"
            sx={{
              backgroundColor: isDimmed('location') ? '#e0e0e0' : 'white',
              transition: 'background-color 0.3s ease',
            }}
            onChange={handleInputChange('location')}
          />
        </Grid>

        {/* Date From Field */}
        <Grid item xs={12} sm={2}>
          <TextField
            label="Date From"
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onFocus={() => handleFocus('dateFrom')}
            onBlur={handleBlur}
            sx={{
              backgroundColor: isDimmed('dateFrom') ? '#e0e0e0' : 'white',
              transition: 'background-color 0.3s ease',
            }}
            color="success"
            onChange={handleInputChange('dateFrom')}
          />
        </Grid>

        {/* Date To Field */}
        <Grid item xs={12} sm={2}>
          <TextField
            label="Date To"
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onFocus={() => handleFocus('dateTo')}
            onBlur={handleBlur}
            sx={{
              backgroundColor: isDimmed('dateTo') ? '#e0e0e0' : 'white',
              transition: 'background-color 0.3s ease',
            }}
            color="success"
            onChange={handleInputChange('dateTo')}
          />
        </Grid>

        {/* Search Button */}
        <Grid item xs={12} sm={2}>
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ height: '100%', borderRadius: '50px' }}
            onClick={() => void handleSearch()}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchBar;
