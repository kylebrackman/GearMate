class AddFirebaseIdToUsers < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :firebase_id, :string
  end
end