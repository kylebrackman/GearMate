class Api::RentalsController < ApplicationController

  def index
    @rentals = Rental.all
    render json: @rentals, include: [:item]
  end

  def create
      item = Item.find(params[:item_id])
      rental_request = RentalRequest.find(params[:rental_request_id])
  
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
