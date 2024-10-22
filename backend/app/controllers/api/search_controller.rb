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
      
        # Perform search based on the updated criteria
        if search_params[:name].present? || search_params[:location].present?
          @results = Item.search('*', where: search_params) # Use '*' as a wildcard if no name is provided
      
          Rails.logger.info "Search results: #{@results.inspect}"
          render json: @results
        else
          render json: { error: 'No valid search parameters provided' }, status: :unprocessable_entity
        end
      end
      
  
      private

      def search_params
        params.permit(:name, :location)
      end
    
end