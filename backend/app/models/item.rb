class Item < ApplicationRecord

    validates :name, :description, :item_type, :condition, :price, :image, presence: true
    validates :image, attached: true, content_type: ['image/png', 'image/jpg', 'image/jpeg'], size: { less_than: 5.megabytes , message: 'is not given between size' }
    validates :price, numericality: { greater_than: 0 }
    validate :validate_item_type
    validate :validate_condition

    belongs_to :owner, class_name: "User"

    has_many :rentals
    has_many :renters, through: :rentals, class_name: "User"
    has_many :rental_requests, dependent: :destroy

    has_one :location, dependent: :destroy
    has_one_attached :image
#     has_many_attached :images


    searchkick locations: ["location"]
    def search_data
        {
            name: name,
            address: location&.address,
            listed: listed,
            location: location.present? ? { lat: location.latitude, lon: location.longitude } : nil,
            rental_periods: rentals.map { |r| { start_date: r.start_date, end_date: r.end_date } },
            start_dates: rentals.map(&:start_date),
            end_dates: rentals.map(&:end_date)
        }
    end

    private


    def validate_item_type
        errors.add(:item_type, "cannot be 'Select'") if item_type == "Select"
    end

    def validate_condition
        errors.add(:condition, "cannot be 'Select'") if condition == "Select"
    end

    def validate_lat_lng
        if lat == 0 || lng == 0
          errors.add(:base, "Latitude and Longitude cannot be equal to 0")
        end
    end
    
end
