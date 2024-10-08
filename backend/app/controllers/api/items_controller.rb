class Api::ItemsController < ApplicationController

    skip_before_action :authorize, only: [:index, :show]
    before_action :set_item, only: [:update, :destroy]

    def index
        items = Item.all
        render json: items
    end


    def show 
        @item = Item.find(params[:id])
        render json: @item
    end

    def create
        item = @current_user.owned_items.create!(owned_item_params)
        if item.save
            item.image.attach(params[:image])
            render json: item, status: :created
        else
            render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        if @item.update(owned_item_params)
          render json: @item
        else
          render json: { errors: @item.errors.full_messages }, status: :unprocessable_entity
        end
    rescue ActiveSupport::MessageVerifier::InvalidSignature => e
        logger.error "Invalid signature error: #{e.message}"
        render json: { error: "Invalid signature" }, status: :unprocessable_entity
    end

    def destroy
        set_item 
        @item.destroy
        head :no_content
    end

    def owned_item_params
        params.permit(:name, :item_type, :description, :condition, :image, :price, :owner_id, :lat, :lng)
    end

    def set_item
        puts "Item ID: #{params[:id]}"  
        @item = @current_user.owned_items.find_by(id: params[:id])
        render json: { error: "Item not found" }, status: :not_found unless @item
    end

end