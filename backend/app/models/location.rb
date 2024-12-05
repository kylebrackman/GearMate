class Location < ApplicationRecord
    belongs_to :item, optional: true
end
