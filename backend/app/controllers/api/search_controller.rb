class Api::SearchController < ApplicationController

    def item_search
        Rails.logger.info "Item search params: #{params}"

        # @name_match = Item.search(params[:name])
        # @location_match = Item.search(params[:location])

        # searching just by name below
        # @results = Item.search(params[:name])

        # searching just by location

        coordinates = Geocoder.search(params[:location]).first.geometry['location']

        lat = coordinates['lat']
        lng = coordinates['lng']


        Rails.logger.info "Coordinates: #{lat}, #{lng}"

        @results = Item.search(params[:name], where: { location: { near: { lat: lat, lon: lng }, within: "100mi" } })

        
        Rails.logger.info "Search results: #{@results.inspect}"

        render json: @results
    end

      private
    

      def search_params
        params.permit(:name, :location)
      end
    

    # private

    # def search_params
    #     params.permit(:name, :location)
    # end
end