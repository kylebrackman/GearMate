class Api::RentalRequestsController < ApplicationController

    def create
      rental_request = @current_user.rental_requests.create!(
        item_id: params[:item][:id],
        start_date: params[:start_date],
        end_date: params[:end_date],
        renter_id: @current_user.id,
        owner_id: params[:item][:owner_id]
      )
      render json: rental_request, status: :created
    end

    def show
      @rental_request = RentalRequest.includes(:item).find(params[:id])
      render json: @rental_request, serializer: RentalRequestSerializer
    end
    
    def finalize_approval
      rental_request = RentalRequest.find(params[:id])
    
      # Log the rental request details
      Rails.logger.debug "Debugging rental_request: #{rental_request.inspect}"
    
      # Attempt to create a new Rental record
      rental = Rental.create(
        rental_request_id: rental_request.id,
        item_id: rental_request.item_id,
        renter_id: rental_request.renter_id,
        start_date: rental_request.start_date,
        end_date: rental_request.end_date,
        owner_id: rental_request.owner_id
      )

      rental_request.update(status: 'approved')
    
      # Render success response
      render json: { message: 'Rental request finalized successfully', rental: rental }, status: :ok
    rescue ActiveRecord::RecordNotFound => e
      # Handle case where the rental request is not found
      render json: { error: 'Rental request not found' }, status: :not_found
    rescue ActiveRecord::RecordInvalid => e
      # Handle case where the rental record creation fails due to validation errors
      render json: { error: e.message, errors: rental.errors.full_messages }, status: :unprocessable_entity
    end
    
    
    def reject
        rental_request = RentalRequest.find(params[:id])
        rental_request.rejected!
        redirect_to rental_request.item, alert: "Rental request rejected."
    end

    def received_pending_rental_requests
      @received_pending_rental_requests = @current_user.received_pending_rental_requests
      render json: @received_pending_rental_requests, each_serializer: RentalRequestSerializer
    end

    def rental_requests_received_pending_with_id
      # @rental_request = @current_user.rental_requests_received_pending.find(params[:id])
      # render json: @rental_request, serializer: RentalRequestSerializer
    end

    
    private

    def rental_request_params
      params.permit(:renter, :item, :start_date, :end_date, :owner_id, :rental_request)
    end
    
end
