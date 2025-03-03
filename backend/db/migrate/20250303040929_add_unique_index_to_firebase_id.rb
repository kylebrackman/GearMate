class AddUniqueIndexToFirebaseId < ActiveRecord::Migration[7.2]
  def change
    add_index :users, :firebase_id, unique: true
  end
end
