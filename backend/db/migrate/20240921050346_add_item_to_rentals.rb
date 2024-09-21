class AddItemToRentals < ActiveRecord::Migration[7.2]
  def change
    add_reference :rentals, :item, null: false, foreign_key: true
  end
end
