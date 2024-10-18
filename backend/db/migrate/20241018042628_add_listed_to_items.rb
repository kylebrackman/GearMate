class AddListedToItems < ActiveRecord::Migration[7.2]
  def change
    add_column :items, :listed, :boolean, default: true
  end
end
