class Rental < ApplicationRecord
        validate :start_date
        validate :end_date
        validate :no_overlapping_rentals
        validate :start_date_minimum
        validate :end_date_after_start_date

    belongs_to :item
    belongs_to :renter, class_name: "User"
    
end
