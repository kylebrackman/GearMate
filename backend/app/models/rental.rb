class Rental < ApplicationRecord
    validate :start_date
    validate :end_date
    validate :no_overlapping_rentals
    validate :start_date_minimum
    validate :end_date_after_start_date

    belongs_to :item
    belongs_to :renter, class_name: "User"
    belongs_to :rental_request

    scope :current, ->(user) { where(renter_id: user.id).where("start_date <= ? AND end_date >= ?", Date.today, Date.today) }
    scope :upcoming, ->(user) { where(renter_id: user.id).where("start_date > ?", Date.today) }
    scope :past, ->(user) { where(renter_id: user.id).where("end_date < ?", Date.today) }    

    private

    def no_overlapping_rentals
        existing_rentals = Rental.where(item_id: item_id).where("start_date <= ? AND end_date >= ?", start_date, end_date)

        if existing_rentals.exists?
            errors.add(:start_date, "cannot overlap with an existing rental")
        end
    end

    def start_date_minimum
        if start_date < Date.today
            errors.add(:start_date, "cannot be in the past")
        end
    end

    def end_date_after_start_date
        return if end_date.blank? || start_date.blank?
    
        if end_date < start_date
          errors.add(:end_date, "must be after the start date")
        end
    end
end
