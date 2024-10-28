class Api::SearchController < ApplicationController

      skip_before_action :authorize

      def item_search
        Rails.logger.info "Item search params: #{params}"

        if params[:name].blank?
          render json: { error: "An item name is required from this page." }, status: :bad_request
          return
        end
      
        # Initialize an empty hash for search parameters
        search_params = {
          listed: true
          # Query is added to below
        }
      
        # MUST INCLUDE NAME IN SEARCH AT LEAST FOR NOW
        # Include the name in search criteria only if it's not an empty string
        # if params[:name].present? && params[:name] != ""
        #   search_params[:name] = params[:name]
        # end
      
        # Include the location in search criteria only if it's not an empty string
        if params[:location].present? && params[:location] != ""
          coordinates = Geocoder.search(params[:location]).first&.geometry['location']
          if coordinates
            lat = coordinates['lat']
            lng = coordinates['lng']
      
            Rails.logger.info "Coordinates: #{lat}, #{lng}"
      
            search_params[:location] = { near: { lat: lat, lon: lng }, within: "100mi" }
          end
        end

        if params[:date_from].present? && params[:date_to].present?
          start_date = Date.parse(params[:date_from])
          end_date = Date.parse(params[:date_to])
          
          # Convert the start and end dates into a range
          rental_period = (start_date..end_date)
          
          # Exclude items where the rental period overlaps with the provided range
          search_params[:rental_periods] = { not: { overlap: rental_period } }
        end

          # Perform search based on the updated criteria
        @results = Item.search(params[:name], where: search_params)

        Rails.logger.info "Search results: #{@results.inspect}"
        render json: @results
      end

    
end