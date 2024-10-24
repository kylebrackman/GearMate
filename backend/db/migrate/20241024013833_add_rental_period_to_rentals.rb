class AddRentalPeriodToRentals < ActiveRecord::Migration[7.2]
  def change
    add_column :rentals, :rental_period, :daterange
  end
end
