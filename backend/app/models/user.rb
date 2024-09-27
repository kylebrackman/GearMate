class User < ApplicationRecord
    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :email, presence: true, uniqueness: { case_sensitive: false, message: "has already been taken" }, format: { with: /\A\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+\z/, message: "Invalid email format" }
    # add in correct error messaging for email already taken
    validates :password, presence: true, length: { minimum: 8 }

    has_secure_password

    has_many :owned_items, class_name: "Item", foreign_key: "owner_id"

    has_many :rental_requests, foreign_key: "renter_id"
    has_many :rentals, foreign_key: :renter_id

    has_one :profile

    has_many :received_pending_rental_requests, 
        -> { where(status: :pending).includes(:item, :renter) }, 
        through: :owned_items, 
        source: :rental_requests
    
    has_many :received_approved_rental_requests, 
        -> { where(status: :approved).includes(:item, :renter) }, 
        through: :owned_items, 
        source: :rental_requests

    def current_rentals
        Rental.current_rentals(self)
    end
    

    def upcoming_rentals
        Rental.upcoming_rentals(self)
    end
    
    def past_rentals
        Rental.past_rentals(self)
    end

    def sent_pending_rental_requests
        RentalRequest.where(renter_id: id, status: 0)
    end

end
