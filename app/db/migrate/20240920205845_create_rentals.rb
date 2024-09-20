class CreateRentals < ActiveRecord::Migration[7.2]
  def change
    create_table :rentals do |t|
      t.references :renter, null: false, foreign_key: true
      t.references :item, null: false, foreign_key: true
      t.date :start_date
      t.date :end_date
      t.references :owner, null: false, foreign_key: true
      t.references :rental_request, null: false, foreign_key: true

      t.timestamps
    end
  end
end
