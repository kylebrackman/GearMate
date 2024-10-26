class RentalSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :start_date, :end_date, :renter_id, :item_id, :rental_request_id, :item, :owner, :owner_profile_id, :item_image

  belongs_to :item, serializer: ItemSerializer

  def owner
    object.item.owner
  end

  def owner_profile_id
    object.item.owner.profile.id
  end

  def item_image
    rails_blob_path(object.item.image, only_path: true) if object.item.image.attached?
  end
end
