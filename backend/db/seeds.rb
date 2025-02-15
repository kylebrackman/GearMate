# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
# db/seeds.rb

require "open-uri"

# Helper method to attach images from local or remote sources
def attach_image(file_name)
  # Check if image exists in local seeds folder
  file_path = Rails.root.join("db", "seeds", "images", file_name)

  if File.exist?(file_path)
    { io: File.open(file_path), filename: file_name, content_type: "image/jpeg" }
  else
    # For remote URLs, example:
    # { io: URI.open("https://example.com/path/to/image.jpeg"), filename: file_name, content_type: "image/jpeg" }
  end
end


# This seed file is not currently working.
user1 = User.create!(
  email: "kyle.a.brackman@gmail.com",
  password: "12341234",
  first_name: "Kyle",
  last_name: "Brackman"
)
user1.create_profile!(
  name: "caillou",
  bio: "creator of GearMate, Climber, Runner.",
  image: attach_image('kb-profile-pic-png')
)

user2 = User.create!(
  email: "chase@nelson.com",
  password: "12341234",
  first_name: "Chase",
  last_name: "Nelson"
)
user2.create_profile!(
  name: "Chase",
  bio: "Cool dude.",
  image: attach_image('chase-profile-pic-png')
)

user3 = User.create!(
  email: "nick@aguila.com",
  password: "12341234",
  first_name: "Nick",
  last_name: "Aguila"
)
user3.create_profile!(
  name: "Nick",
  bio: "Cool dude.",
  image: attach_image('nick-profile-pic-png')
)

# Create items for each user
item1 = user1.owned_items.create!(
  name: "Fishing Rod",
  description: "A great pole for day to day.",
  item_type: "Fishing",
  condition: "Like New",
  price: 6,
  image: attach_image('fishing-pole.png')
)

item1 = user1.owned_items.create!(
  name: "Quickdraw",
  description: "Another draw to help you send.",
  item_type: "Climb",
  condition: "Like New",
  price: 5,
  image: attach_image('quickdraw.png')
)

item1 = user1.owned_items.create!(
  name: "DC Snowboard Boots",
  description: "Mens size 10, only used a few times",
  item_type: "Climb",
  condition: "Like New",
  price: 10,
  image: attach_image('snowboard-boots.png')
)

item2 = user2.owned_items.create!(
  name: "Kayak",
  description: "Open water kayak, 12 feet",
  item_type: "Water Sport",
  condition: "Light Use",
  price: 8,
  image: attach_image('kayak.png')
)

item3 = user3.owned_items.create!(
  name: "Mountain Bike",
  description: "High-quality mountain bike with full suspension.",
  item_type: "Bike",
  condition: "Like New",
  price: 25,
  image: attach_image('mountain-bike.png')
)

item3 = user3.owned_items.create!(
  name: "Yeti Cooler",
  description: "55L, great for a day outdoorcs whether at the beach or in the mountains.",
  item_type: "Beach",
  condition: "Like New",
  price: 15,
  image: attach_image('yeti-cooler.png')
)

puts "Seeding completed successfully!"
