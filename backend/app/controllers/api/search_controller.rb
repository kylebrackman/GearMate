class Api::SearchController < ApplicationController

    def item_search
        query = params[:query] # Accept the query from the request body
        @results = Item.search(query)
        render json: @results
    end
end
