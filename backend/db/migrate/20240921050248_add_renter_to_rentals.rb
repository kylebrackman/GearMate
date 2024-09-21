class AddRenterToRentals < ActiveRecord::Migration[7.2]
  def change
    add_reference :rentals, :renter, null: false, foreign_key: { to_table: :users }
  end
end
