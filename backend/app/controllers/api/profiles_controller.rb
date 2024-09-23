class Api::ProfilesController < ApplicationController

    before_action :authorize, only: [:create]

    def create
        puts "Profile Params: #{profile_params}"
        profile = @current_user.create_profile(profile_params)
        profile.image.attach(params[:image])
        render json: profile, status: :created
    end

    def index
        users = User.all
        render json: users, include: [:profile]
    end

    def show
        user = User.find(params[:id])
        profile = user.profile
        render json: profile
    end

    private 

    def profile_params
        params.permit(:name, :bio, :lat, :lng, :user_id, :image)
    end
end
