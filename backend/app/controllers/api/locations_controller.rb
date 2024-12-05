class Api::LocationsController < ApplicationController

  require 'logger'

  before_action :set_location, only: %i[ show update destroy ]

  def index

    @locations = Location.near(params[:location], params[:radius], order: :distance)
    @locations = Location.all

    render json: @locations
  end

  def show
    render json: @location
  end

def create
  @location = Location.new(location_params)

  if @location.save
    render json: @location, status: :created, location: @location
  else
    render json: @location.errors, status: :unprocessable_entity
  end
end

  def city_and_state
  
    address = Geocoder.search([location_params[:latitude], location_params[:longitude]])
  
    if address.present? && address.first
      render json: { location: "#{address.first.city}, #{address.first.state}" }
    else
      render json: { errors: ['No address found for the provided coordinates.'] }, status: :unprocessable_entity
    end
  end
  

  def update
    if @location.update(location_params)
      render json: @location
    else
      render json: @location.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @location.destroy!
  end

  private
    def set_location
      @location = Location.find(params[:id])
    end

    def location_params
      params.require(:location).permit(:name, :address, :latitude, :longitude, :user_id, :item_id)
    end
end
