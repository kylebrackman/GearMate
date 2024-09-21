# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2024_09_21_050346) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.string "item_type"
    t.string "condition"
    t.string "description"
    t.integer "price"
    t.float "lat"
    t.float "lng"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "owner_id", null: false
    t.index ["owner_id"], name: "index_items_on_owner_id"
  end

  create_table "profiles", force: :cascade do |t|
    t.string "name"
    t.string "bio"
    t.float "lat"
    t.float "lng"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_profiles_on_user_id"
  end

  create_table "rental_requests", force: :cascade do |t|
    t.date "start_date"
    t.date "end_date"
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "item_id", null: false
    t.bigint "renter_id", null: false
    t.index ["item_id"], name: "index_rental_requests_on_item_id"
    t.index ["renter_id"], name: "index_rental_requests_on_renter_id"
  end

  create_table "rentals", force: :cascade do |t|
    t.date "start_date"
    t.date "end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "renter_id", null: false
    t.bigint "item_id", null: false
    t.index ["item_id"], name: "index_rentals_on_item_id"
    t.index ["renter_id"], name: "index_rentals_on_renter_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "password_digest"
    t.string "email"
    t.string "first_name"
    t.string "last_name"
    t.string "stripe_connected_account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "items", "users", column: "owner_id"
  add_foreign_key "profiles", "users"
  add_foreign_key "rental_requests", "items"
  add_foreign_key "rental_requests", "users", column: "renter_id"
  add_foreign_key "rentals", "items"
  add_foreign_key "rentals", "users", column: "renter_id"
end
