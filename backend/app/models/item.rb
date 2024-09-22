class Item < ApplicationRecord

    belongs_to :owner, class_name: "User"

    has_many :rentals
    has_many :renters, through: :rentals, class_name: "User"
    has_many :rental_requests, dependent: :destroy

    has_one_attached :image
    
end
