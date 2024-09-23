class UserSerializer < ActiveModel::Serializer
  attributes :id, :owned_items, :first_name, :last_name, :email, :profile, :current_rentals, :upcoming_rentals, :past_rentals, :pending_rental_requests

  has_one :profile

  def current_rentals
    object.current_rentals
  end

  def upcoming_rentals
    object.upcoming_rentals
  end

  def past_rentals
    object.past_rentals
  end

  def pending_rental_requests
    object.pending_rental_requests
  end
end
