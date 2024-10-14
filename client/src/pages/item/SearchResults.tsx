import { Item } from '@/types/models.types.ts';
import { Box, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ItemCard from '@/components/item/ItemCard.tsx';
import CircularProgress from '@mui/material/CircularProgress';
import SearchBar from '@/components/common/searchbar.tsx';
import { searchItemsApi } from '@/services/SearchApi';
import { useSearchParams } from 'react-router-dom';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<Item[] | null>(null);
  const name = searchParams.get('name') || '';
  const location = searchParams.get('location') || '';
  const dateFrom = searchParams.get('dateFrom') || '';
  const dateTo = searchParams.get('dateTo') || '';

  const searchResultList = searchResults?.map((i) => (
    <Grid item xs={6} sm={4} md={3} xl={2} key={i.id} sx={{ p: 1.5 }}>
      <ItemCard
        id={i.id}
        name={i.name}
        image={i.image ?? ''}
        description={i.description}
        price={i.price}
      />
    </Grid>
  ));

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const searchParams = { name, location, dateFrom, dateTo };
        const data = await searchItemsApi(searchParams);
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    void fetchResults();
  }, [name, location, dateFrom, dateTo]);

  return (
    <div>
      <SearchBar />
      <Box sx={{ mx: '5%' }}>
        <Typography sx={{ mt: 2 }}>
          Searching for Gear
          {name && ` named "${name}"`}
          {location && ` in "${location}"`}
          {dateFrom && ` from "${dateFrom}"`}
          {dateTo && ` to "${dateTo}"`}
        </Typography>
      </Box>
      <Box sx={{ mx: '5%' }}>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {(searchResults?.length ?? 0 > 0) ? (
            searchResultList
          ) : (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default SearchResults;
