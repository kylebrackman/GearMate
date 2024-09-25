class RenterSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :profile
  
end
