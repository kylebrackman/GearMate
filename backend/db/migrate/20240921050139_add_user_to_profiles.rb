class AddUserToProfiles < ActiveRecord::Migration[7.2]
  def change
    add_reference :profiles, :user, null: false, foreign_key: true
  end
end
