class Api::SearchController < ApplicationController

    def item_search
        Rails.logger.info "Item search params: #{params}"
        @results = Item.search(params[:name])
        Rails.logger.info "Search results: #{@results.inspect}"
        render json: @results
    end
end