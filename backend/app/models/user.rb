class User < ApplicationRecord
    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :email, presence: true, uniqueness: { case_sensitive: false, message: "has already been taken" }, format: { with: /\A\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+\z/, message: "Invalid email format" }
    validates :password, presence: true, length: { minimum: 8 }

    has_secure_password

    has_many :owned_items, -> {where(listed: true)}, class_name: "Item", foreign_key: "owner_id"

    has_many :rental_requests, foreign_key: "renter_id"
    has_many :rentals, foreign_key: :renter_id
    

    has_one :profile

    has_many :item_locations, through: :owned_items, source: :location

    has_many :received_pending_rental_requests, 
        -> { where(status: :pending).includes(:item, :renter) }, 
        through: :owned_items, 
        source: :rental_requests
    
    has_many :received_approved_rental_requests, 
        -> { where(status: :approved).includes(:item, :renter) }, 
        through: :owned_items, 
        source: :rental_requests

    # trying to make new association here
    has_many :owned_rentals, through: :received_approved_rental_requests, source: :rental

    def current_rentals
        Rental.current(self)
    end
    
    def upcoming_rentals
        Rental.upcoming(self)
    end

    def past_rentals
        Rental.past(self)
    end

    def sent_pending_rental_requests
        RentalRequest.where(renter_id: id, status: 0)
    end

end
