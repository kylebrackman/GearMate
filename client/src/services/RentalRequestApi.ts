import { RentalRequest } from '../models/RentalRequestModel';

/*************  ✨ Codeium Command ⭐  *************/
/******  67990282-acf0-413a-80b2-adc60e15398c  *******/
export const createRentalRequestApi = async (rentalRequestData: RentalRequest) => {
    try {
      const response = await fetch('/api/rental_requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rentalRequestData),
      });
      const data = await response.json();
      if (!data.errors) {
        console.log('Rental request created successfully:', data);
        // Handle successful creation of rental request
      } else {
        console.error('Error creating rental request:', data.errors);
      }
    } catch (error) {
      console.error('Error creating rental request:', error);
    }
  };

export const getPendingRentalRequestsApi = async () => {
    try {
      const response = await fetch('/api/rental_requests_received_pending');
      const data = await response.json();
      if (!data.errors) {
        console.log(data)
        return data;
      } else {
        console.error('Error retrieving pending rental requests:', data.errors);
      }
    } catch (error) {
      console.error('Error retrieving pending rental requests:', error);
    }
}

export const getPendingRentalRequestByIdApi = async (id: string) => {
    try {
      const response = await fetch(`/api/rental_requests_received_pending_with_id/${id}`);
      const data = await response.json();
      if (!data.errors) {
        console.log(data)
        return data;
      } else {
        console.error('Error retrieving pending rental requests:', data.errors);
      }
    } catch (error) {
      console.error('Error retrieving pending rental requests:', error);
    }
}