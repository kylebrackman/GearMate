class Api::SearchController < ApplicationController

    def item_search
        Rails.logger.info "Item search params: #{params}"

        # @name_match = Item.search(params[:name])
        # @location_match = Item.search(params[:location])

        # searching just by name below
        # @results = Item.search(params[:name])

        # searching just by location
        @results= Item.search(params[:location], params[:name])
        
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