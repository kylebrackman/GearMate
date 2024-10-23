class Api::SearchController < ApplicationController

      def item_search
        Rails.logger.info "Item search params: #{params}"
      
        # Initialize an empty hash for search parameters
        search_params = {}
      
        # Include the name in search criteria only if it's not an empty string
        if params[:name].present? && params[:name] != ""
          search_params[:name] = params[:name]
        end
      
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
    
          # Query for items that have rental periods overlapping with the date range
          search_params[:start_dates] = { gte: start_date }
          search_params[:end_dates] = { lte: end_date }
        end

          # Perform search based on the updated criteria
        @results = Item.search('*', where: search_params)

        Rails.logger.info "Search results: #{@results.inspect}"
        render json: @results
      end

  
      private

      def search_params
        params.permit(:name, :location)
      end
    
end