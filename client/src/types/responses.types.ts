import { Rental } from '@/types/models.types';

export interface ErrorResponse {
  errors: string[];
}

export interface RentalApprovalResponse {
  message: string;
  rental: Rental;
}
