class User < ApplicationRecord

    has_secure_password

    has_many :owned_items, class_name: "Item", foreign_key: "owner_id"

    has_many :rental_requests, foreign_key: "requester_id"
    has_many :rentals, foreign_key: :renter_id

    has_one :profile

end
