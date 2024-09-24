class AddOwnerIdToRentalRequests < ActiveRecord::Migration[7.2]
  def change
    add_reference :rental_requests, :owner, null: false, foreign_key: { to_table: :users }
  end
end
