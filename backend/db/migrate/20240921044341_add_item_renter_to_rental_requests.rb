class AddItemRenterToRentalRequests < ActiveRecord::Migration[7.2]
  def change
    add_reference :rental_requests, :item, null: false, foreign_key: true
    add_reference :rental_requests, :renter, null: false, foreign_key: { to_table: :users }
  end
end
