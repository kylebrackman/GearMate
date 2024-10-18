class AllowNullItemIdOnRentalRequest < ActiveRecord::Migration[7.2]
  def change
    change_column_null :rental_requests, :item_id, true
  end
end
