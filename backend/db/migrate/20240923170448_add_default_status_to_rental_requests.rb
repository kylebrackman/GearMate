class AddDefaultStatusToRentalRequests < ActiveRecord::Migration[7.2]
  def change
    change_column_default :rental_requests, :status, 0
  end
end
