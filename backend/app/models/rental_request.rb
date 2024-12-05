class RentalRequest < ApplicationRecord
    validate :start_date
    validate :end_date
    validate :start_date_minimum
    validate :end_date_after_start_date

    belongs_to :item
    belongs_to :renter, class_name: "User"
    belongs_to :owner, class_name: "User"
    has_one :rental, dependent: :nullify

    enum status: {
        pending: 0,
        approved: 1,
        rejected: 2
      }

    def show
        @rental_request = RentalRequest.find(params[:id])
        @renter = @rental_request.renter
    end
  
    def approve
        @rental_request = RentalRequest.find(params[:id])
        @rental_request.update(status: 'approved')
        Rental.create(renter: @rental_request.renter, item: @rental_request.item, start_date: @rental_request.start_date, end_date: @rental_request.end_date)
        render json: { message: 'Rental request finalized successfully' }, status: :ok
        rescue ActiveRecord::RecordNotFound => e
        render json: { error: 'Rental request not found' }, status: :not_found
    end



    private

    def start_date_minimum
        if start_date < Date.today
            errors.add(:start_date, "cannot be in the past")
        end
    end

    def end_date_after_start_date
        return if end_date.blank? || start_date.blank?
    
        if end_date < start_date
          errors.add(:end_date, "must be after the start date")
        end
    end
    
end
