class UserSerializer < ActiveModel::Serializer
  attributes :id, :owned_items, :first_name, :last_name, :email, :profile, :current_rentals, :upcoming_rentals, :past_rentals, :sent_pending_rental_requests, :received_pending_rental_requests

  has_one :profile

end
