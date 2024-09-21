class CreateRentalRequests < ActiveRecord::Migration[7.2]
  def change
    create_table :rental_requests do |t|
      t.date :start_date
      t.date :end_date
      t.integer :status

      t.timestamps
    end
  end
end
