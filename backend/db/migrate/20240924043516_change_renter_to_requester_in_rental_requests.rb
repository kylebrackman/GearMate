class ChangeRenterToRequesterInRentalRequests < ActiveRecord::Migration[7.2]
  def change
        # Remove the renter_id column
        remove_reference :rental_requests, :renter, foreign_key: { to_table: :users }
    
        # Add the new requester_id column
        add_reference :rental_requests, :requester, foreign_key: { to_table: :users }, null: false
  end
end
