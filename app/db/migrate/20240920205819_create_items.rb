class CreateItems < ActiveRecord::Migration[7.2]
  def change
    create_table :items do |t|
      t.references :owner, null: false, foreign_key: true
      t.string :name
      t.string :item_type
      t.string :condition
      t.string :description
      t.integer :price
      t.float :lat
      t.float :lng

      t.timestamps
    end
  end
end
