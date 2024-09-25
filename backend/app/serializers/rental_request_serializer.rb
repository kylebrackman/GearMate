class RentalRequestSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :status, :renter, :item

  belongs_to :item, serializer: ItemSerializer
  belongs_to :renter, serializer: RenterSerializer
end
