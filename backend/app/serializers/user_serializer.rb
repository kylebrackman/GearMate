class UserSerializer < ActiveModel::Serializer
  attributes :id, :owned_items, :first_name, :last_name, :email, :profile, :current_rentals, :upcoming_rentals, :past_rentals, :pending_rental_requests, :rental_requests_received_pending

  has_one :profile

end
