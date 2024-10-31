class AddRatingToItem < ActiveRecord::Migration[7.2]
  def change
    add_column :items, :rating, :float, default: 5.0, null: false
  end
end
