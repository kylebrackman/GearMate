class RemoveLocationUserAssociation < ActiveRecord::Migration[7.2]
  def change
    remove_reference :locations, :user, foreign_key: true
  end
end
