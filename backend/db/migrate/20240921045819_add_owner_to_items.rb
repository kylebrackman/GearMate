class AddOwnerToItems < ActiveRecord::Migration[7.2]
  def change
    add_reference :items, :owner, null: false, foreign_key: { to_table: :users }
  end
end
