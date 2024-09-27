class RentalSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :renter_id, :item_id, :rental_request_id, :item, :owner, :owner_profile_id

  belongs_to :item, serializer: ItemSerializer

  def owner
    object.item.owner
  end

  def owner_profile_id
    object.item.owner.profile.id
  end
end
