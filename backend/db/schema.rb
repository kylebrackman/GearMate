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

ActiveRecord::Schema[7.2].define(version: 2024_10_18_042628) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

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
    t.boolean "listed", default: true
    t.index ["owner_id"], name: "index_items_on_owner_id"
  end

  create_table "locations", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.float "latitude"
    t.float "longitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "item_id", null: false
    t.index ["item_id"], name: "index_locations_on_item_id"
    t.index ["latitude"], name: "index_locations_on_latitude"
    t.index ["longitude"], name: "index_locations_on_longitude"
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
    t.integer "status", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "item_id"
    t.bigint "owner_id", null: false
    t.bigint "renter_id", null: false
    t.index ["item_id"], name: "index_rental_requests_on_item_id"
    t.index ["owner_id"], name: "index_rental_requests_on_owner_id"
    t.index ["renter_id"], name: "index_rental_requests_on_renter_id"
  end

  create_table "rentals", force: :cascade do |t|
    t.date "start_date"
    t.date "end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "renter_id", null: false
    t.bigint "item_id", null: false
    t.bigint "rental_request_id", null: false
    t.index ["item_id"], name: "index_rentals_on_item_id"
    t.index ["rental_request_id"], name: "index_rentals_on_rental_request_id"
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

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "items", "users", column: "owner_id"
  add_foreign_key "locations", "items"
  add_foreign_key "profiles", "users"
  add_foreign_key "rental_requests", "items"
  add_foreign_key "rental_requests", "users", column: "owner_id"
  add_foreign_key "rental_requests", "users", column: "renter_id"
  add_foreign_key "rentals", "items"
  add_foreign_key "rentals", "rental_requests"
  add_foreign_key "rentals", "users", column: "renter_id"
end
