class RentalRequest < ApplicationRecord

    belongs_to :item
    belongs_to :renter, class_name: "User"
    
end
