class CreateUsers < ActiveRecord::Migration[7.2]
  def change
    create_table :users do |t|
      t.string :password_digest
      t.string :email
      t.string :first_name
      t.string :last_name
      t.string :stripe_connected_account_id

      t.timestamps
    end
  end
end
