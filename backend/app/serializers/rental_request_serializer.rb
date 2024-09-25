class RentalRequestSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :status, :renter, :item, :owner_id

  belongs_to :item, serializer: ItemSerializer
  belongs_to :renter, serializer: RenterSerializer
end
