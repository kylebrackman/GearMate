class ProfileSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :bio, :lat, :lng, :image

  belongs_to :user

  def image
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end
end
