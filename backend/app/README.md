# Models and Application Overview
## Overview
This application is a user-to-user gear rental platform that facilitates renting gear between users. The core functionality includes creating user accounts, listing items for rent, requesting rentals, approving or rejecting those requests, and tracking active and past rentals. Below is a description of the key models in the application and their purpose.

## Models
### 1. User
   - The User model represents individuals on the platform, both renters and owners of gear.
   - Users have two separate relationships with items:
     1. Ownership: Users directly own items through the owner_id association in the Item model.
        - The foreign key here is alias as "owner_id" instead of "user_id" to further clarify business logic and se case.
     2. Renting: Users rent items via the Rental model. The Rental model links the renting user (renter_id as the foreign key) to the rented item (item_id as the foreign key). 

### 2. Item
   - The Item model represents the gear available for rent.
   - An item can be rented multiple times, and each rental is tracked through the Rental model.
   - Each item is also associated with a Location, which tracks where the item is physically located.


### 3. RentalRequest
   - The Rental Request model tracks requests for gear rentals; once they are approved, a Rental record is created.
   - The decision to make this a separate model from Rental is to separate the business logic and keep rentals clean. It would be misleading to create an instance of a rental if a rental never existed in the first place.
   - This allows for a cancellation of rentals later on if needed within a cleaner process.
### 4. Rental
   - The Rental model tracks rentals.
   - A rental is created after a rental request is approved, and it stores details about the rental period (start_date, end_date) and references both the renting user (renter_id) and the rented item (item_id).
### 5. Profile
   - The Profile model contains additional user information.
### 6. Location
   - The Location model tracks where items are located.

