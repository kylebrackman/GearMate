import { RentalRequest } from '@/types/models.types';

export const createRentalRequestApi = async (
  rentalRequestData: RentalRequest
) => {
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
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${errorData.errors}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPendingRentalRequestByIdApi = async (id: string) => {
  try {
    const response = await fetch(`/api/received_pending_rental_request/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${errorData.errors}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const approveRentalRequestApi = async (id: string) => {
  try {
    const response = await fetch(`/api/approve_rental_request/${id}`, {
      method: 'PATCH',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${errorData.errors}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
