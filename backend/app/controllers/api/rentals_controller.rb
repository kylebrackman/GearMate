class Api::RentalsController < ApplicationController

    def create
        item = Item.find(params[:item_id])
        # Assuming @current_user is set elsewhere in your application, e.g., in ApplicationController
        rental_request = RentalRequest.find(params[:rental_request_id]) # Find the rental request by ID
    
        # Create a new Rental record based on the rental request
        rental = Rental.create(
          item_id: item.id,
          renter_id: @current_user.id,
          start_date: rental_request.start_date,
          end_date: rental_request.end_date,
          owner_id: item.owner_id,
          rental_request_id: rental_request.id
        )

        render json: rental, status: :created
      end
    
    private

    def rental_params
        params.permit(:renter_id, :item_id, :start_date, :end_date, :owner_id, :rental_request_id)
    end
end
