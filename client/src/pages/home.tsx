import React, { useState, useEffect } from 'react';
import { Item } from '../models/ItemModel.tsx';
import AllItemCard from '../components/Items/AllItemCard.tsx';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { getAllItemsApi } from '../services/ItemApi.ts';

const AllItems: React.FC = () => {
    const [allItems, setAllItems] = useState<Item[] | null>(null);

    useEffect(() => {
        // Fetch all items from the server
        fetchAllItems();
    }, []);

    const fetchAllItems = () => {
        try {
          getAllItemsApi().then((data) => {
            setAllItems(data);
          });
        } catch (error) {
          console.error("Error fetching allItems:", error);
        }
      };

    const items: Item[] = Array.isArray(allItems) ? allItems : [];

    const allItemsList = items.map((i) => (
        <Grid item xs={6} sm={4} md={3} xl={2} key={i.id} sx={{ p: 1.5 }}>
            <AllItemCard
                id={i.id}
                name={i.name}
                // image={i.image}
                description={i.description}
                price={i.price}
            />
        </Grid>
    ));

    return (
        <Box sx={{ mx: '5%', mt: '2%' }}>
            <Grid container spacing={2} sx={{ mt: 5 }}>
                {items.length > 0 ? allItemsList : <p>No items uploaded.</p>}
            </Grid>
        </Box>
    );
};

export default AllItems;
