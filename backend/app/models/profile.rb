class Profile < ApplicationRecord
    validates :image, content_type: ['image/png', 'image/jpg', 'image/jpeg'], size: { less_than: 5.megabytes , message: 'is not given between size' }
    validates :name, presence: { message: 'is required' }
    validates :bio, presence: { message: 'is required' }

    belongs_to :user
    has_one_attached :image
end
