class Profile < ApplicationRecord
    validates :image, attached: true, content_type: ['image/png', 'image/jpg', 'image/jpeg'], size: { less_than: 5.megabytes , message: 'is not given between size' }
    validates :name, :bio, presence: true
    # Add in validation for lat and lng later when google maps api is brought back in

    belongs_to :user
    has_one_attached :image
end
