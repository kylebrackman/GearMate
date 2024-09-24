class RemoveOwnerIdIdFromRentalRequests < ActiveRecord::Migration[7.2]
  def change
    remove_reference :rental_requests, :owner_id, foreign_key: { to_table: :users }
  end
end
