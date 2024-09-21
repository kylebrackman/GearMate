class CreateProfiles < ActiveRecord::Migration[7.2]
  def change
    create_table :profiles do |t|
      t.string :name
      t.string :bio
      t.float :lat
      t.float :lng

      t.timestamps
    end
  end
end
