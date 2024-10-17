class ItemSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :item_type, :condition, :description, :image, :price, :owner_id, :owner_first_name, :owner_last_name, :location
  
  has_many :rentals
  has_many :renters, through: :rentals, class_name: "User"
  has_many :rental_requests, dependent: :destroy
  has_one :location

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
