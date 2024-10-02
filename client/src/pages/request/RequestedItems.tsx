import { useEffect, useState } from 'react';
import RequestedItemsCard from '@/components/request/RequestedItemsCard.tsx';
import List from '@mui/material/List';
import { getPendingRentalRequestsApi } from '@/services/RentalRequestApi.ts';
import { Box } from '@mui/material';
import { RentalRequest } from '@/types/models.types.ts';
const PendingRentalRequestsReceived = () => {
  const [pendingRentalRequestsReceived, setPendingRentalRequestsReceived] =
    useState<RentalRequest[]>([]);

  useEffect(() => {
    const fetchRentalRequests = async () => {
      try {
        const response = await getPendingRentalRequestsApi();
        const data = await response;
        if (!data.errors) {
          setPendingRentalRequestsReceived(data);
        } else {
          console.error(
            'Error retrieving pending rental requests:',
            data.errors
          );
        }
      } catch (error) {
        console.error('Error retrieving pending rental requests:', error);
      }
    };

    fetchRentalRequests();
  }, []);

  if (pendingRentalRequestsReceived.length === 0) {
    return <div>None of your gear has any requests... yet!</div>;
  }

  const pendingRentalRequestsReceivedList = pendingRentalRequestsReceived.map(
    (request) => {
      return <RequestedItemsCard request={request} key={request.id} />;
    }
  );

  return (
    <Box sx={{ mt: 2, ml: 2, mr: 2 }}>
      <List sx={{ width: '100%', bgcolor: 'background.paper', mt: 2 }}>
        {pendingRentalRequestsReceivedList}
      </List>
    </Box>
  );
};

export default PendingRentalRequestsReceived;
