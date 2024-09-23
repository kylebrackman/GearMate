class UserSerializer < ActiveModel::Serializer
  attributes :id, :owned_items, :first_name, :last_name, :email, :profile

  has_one :profile
end
