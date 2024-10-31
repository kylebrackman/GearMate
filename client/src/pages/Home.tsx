import { Item } from '@/types/models.types.ts';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import ItemCard from '../components/item/ItemCard.tsx';
import { getAllItemsApi } from '../services/ItemApi.ts';
import CircularProgress from '@mui/material/CircularProgress';
import SearchBar from '../components/common/searchbar.tsx';
import { Typography } from '@mui/material';

const Home: React.FC = () => {
  const [allItems, setAllItems] = useState<Item[] | null>(null);

  useEffect(() => {
    // Fetch all items from the server
    fetchAllItems().catch(console.error);
  }, []);

  const fetchAllItems = async () => {
    try {
      await getAllItemsApi().then((data) => {
        setAllItems(data);
      });
    } catch (error) {
      console.error('Error fetching allItems:', error);
    }
  };

  const items: Item[] = Array.isArray(allItems) ? allItems : [];

  const allItemsList = items.map((i) => (
    <Grid item xs={12} sm={4} md={3} xl={2} key={i.id} sx={{ p: 1.5 }}>
      <ItemCard
        id={i.id}
        name={i.name}
        image={i.image ?? ''}
        description={i.description}
        price={i.price}
        rating={i.rating}
      />
    </Grid>
  ));
  return (
    <>
      <Box
        sx={{
          backgroundImage: 'url("../../../static-photos/i25-highway.png")',
          padding: 3,
          height: '30vh',
          width: '100%',
        }}
      >
        <SearchBar />
      </Box>
      {/* <SearchBar /> */}
      <Box
        sx={{
          mx: '5%',
          mt: '2%',
          alignContent: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h2" fontWeight="bold">
            Skip the rental shop.
          </Typography>
          <Typography variant="h5">
            Rent gear directly from locals, anywhere.
          </Typography>
        </Box>
        <Grid container spacing={2} sx={{ mt: 5 }}>
          {items.length > 0 ? (
            allItemsList
          ) : (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Home;
