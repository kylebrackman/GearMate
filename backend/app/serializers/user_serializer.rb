class UserSerializer < ActiveModel::Serializer
  attributes :id, :owned_items, :first_name, :last_name, :email, :profile, :current_rentals, :upcoming_rentals, :past_rentals, :sent_pending_rental_requests, :received_pending_rental_requests, :received_approved_rental_requests

  has_one :profile
  # has_one :location

  has_many :current_rentals, serializer: RentalSerializer
  has_many :upcoming_rentals, serializer: RentalSerializer
  has_many :past_rentals, serializer: RentalSerializer

  def current_rentals
    object.current_rentals
  end


  def upcoming_rentals
    object.upcoming_rentals
  end


  def past_rentals
    object.past_rentals
  end

end
