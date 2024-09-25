import { RentalRequest } from '../models/RentalRequestModel';

export const createRentalRequestApi = async (rentalRequestData: RentalRequest) => {
  try {
    const response = await fetch('/api/rental_requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rentalRequestData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Validation Error: ${errorData.errors}`);
    } else {
      const createdRentalRequest = await response.json();
      return createdRentalRequest;
    }
  } catch (error) {
    console.error('Error creating rental request:', error);
    throw error;
  }
};

export const getPendingRentalRequestsApi = async () => {
  try {
    const response = await fetch('/api/received_pending_rental_requests');
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
    const response = await fetch(`/api/received_pending_rental_request/${id}`);
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