class ItemSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  
  has_many :rentals
  has_many :renters, through: :rentals, class_name: "User"
  has_many :rental_requests, dependent: :destroy

  attributes :id, :name, :item_type, :condition, :created_at, :description, :image, :price, :owner_id, :owner_first_name, :owner_last_name

  def image
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end

  def owner_first_name
    object.owner.first_name 
  end

  def owner_last_name
    object.owner.last_name
  end
end
