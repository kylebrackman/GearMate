class User < ApplicationRecord

    has_secure_password

    has_many :owned_items, class_name: "Item", foreign_key: "owner_id"

    has_many :rental_requests, foreign_key: "requester_id"
    has_many :rentals, foreign_key: :renter_id

    has_one :profile

    def current_rentals
        Rental.current_rentals(self)
    end
    
    def upcoming_rentals
        Rental.upcoming_rentals(self)
    end
    
    def past_rentals
        Rental.past_rentals(self)
    end

    def pending_rental_requests
        RentalRequest.where(renter_id: id, status: 0)
    end

end
