class Api::LocationsController < ApplicationController

  require 'logger'

  before_action :set_location, only: %i[ show update destroy ]

  # GET /locations
  def index

    @locations = Location.near(params[:location], params[:radius], order: :distance)
    @locations = Location.all

    render json: @locations
  end

  # GET /locations/1
  def show
    render json: @location
  end

  # POST /locations
def create
  @location = Location.new(location_params)

  if @location.save
    render json: @location, status: :created, location: @location
  else
    render json: @location.errors, status: :unprocessable_entity
  end
end

  def city_and_state
  
    # Perform the geocoding search
    address = Geocoder.search([location_params[:latitude], location_params[:longitude]])
  
    if address.present? && address.first
      # Render the city and state
      render json: { location: "#{address.first.city}, #{address.first.state}" }
    else
      render json: { errors: ['No address found for the provided coordinates.'] }, status: :unprocessable_entity
    end
  end
  

  # PATCH/PUT /locations/1
  def update
    if @location.update(location_params)
      render json: @location
    else
      render json: @location.errors, status: :unprocessable_entity
    end
  end

  # DELETE /locations/1
  def destroy
    @location.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_location
      @location = Location.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def location_params
      params.require(:location).permit(:name, :address, :latitude, :longitude, :user_id, :item_id)
    end
end
