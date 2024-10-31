import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField, Button, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import SearchIcon from '@mui/icons-material/Search';
import Alert from '@mui/material/Alert';

type SearchField = 'location' | 'name' | 'date_from' | 'date_to';

const SearchBar: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  // State to track which field is currently focused
  const [focusedField, setFocusedField] = useState<SearchField | null>(null);
  const [searchParams, setSearchParams] = useState({
    name: '',
    location: '',
    date_from: '',
    date_to: '',
  });

  const navigate = useNavigate();

  const handleFocus = (field: SearchField) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleDateFromChange = (value: Dayjs | null) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      date_from: value ? value.toISOString() : '',
    }));
  };

  const handleDateToChange = (value: Dayjs | null) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      date_to: value ? value.toISOString() : '',
    }));
  };

  const handleSearch = () => {
    const query = new URLSearchParams(searchParams).toString();
    console.log(searchParams);
    if (searchParams.name == '') {
      setErrors(['Name is required.']);
    } else navigate(`/search?${query}`);
  };

  const handleInputChange =
    (field: SearchField) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchParams((prevParams) => ({
        ...prevParams,
        [field]: event.target.value,
      }));
    };

  const isDimmed = (field: SearchField): boolean => {
    return focusedField !== null && focusedField !== field;
  };

  return (
    <Box>
      <Box
        sx={{
          p: 2,
          borderRadius: '50px',
          display: 'flex',
          alignItems: 'center',
          mt: 3,
          mx: '25%',
          boxShadow: 5,
          backgroundColor: 'white',
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
            <DatePicker
              label="Date From"
              // onBlur={handleBlur}
              sx={{
                backgroundColor: isDimmed('date_from') ? '#e0e0e0' : 'white',
                transition: 'background-color 0.3s ease',
              }}
              onChange={handleDateFromChange}
            />
          </Grid>

          {/* Date To Field */}
          <Grid item xs={12} sm={2}>
            <DatePicker
              label="Date To"
              // onBlur={handleBlur}
              sx={{
                backgroundColor: isDimmed('date_to') ? '#e0e0e0' : 'white',
                transition: 'background-color 0.3s ease',
              }}
              onChange={handleDateToChange}
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
              <SearchIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Box sx={{ width: '25%' }}>
          {errors.map((error, index) => (
            <Alert key={index} severity="error" sx={{ textAlign: 'center' }}>
              {error}
            </Alert>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchBar;
