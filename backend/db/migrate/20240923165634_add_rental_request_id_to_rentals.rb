class AddRentalRequestIdToRentals < ActiveRecord::Migration[7.2]
  def change
    add_reference :rentals, :rental_request, null: false, foreign_key: true
  end
end
