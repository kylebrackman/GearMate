import { Rental } from '@/types/models.types';

export interface ErrorResponse {
  errors: string[];
  error: string;
}

export interface RentalApprovalResponse {
  message: string;
  rental: Rental;
}

export interface CityAndState {
  address: string;
  location: string;
}
