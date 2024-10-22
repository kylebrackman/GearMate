class Api::ProfilesController < ApplicationController

    before_action :authorize, only: [:create]

    def create
        profile = @current_user.create_profile(profile_params)
        profile.image.attach(params[:image])

        if profile.save
            render json: profile, status: :created
        else
            render json: { errors: profile.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def index
        profiles = Profile.all
        render json: profiles, include: [:profile]
    end


    def show
        profile = Profile.find(params[:id])
        profile = profile
        render json: profile
    end

    private 

    def profile_params
        params.permit(:name, :bio, :lat, :lng, :user_id, :image)
    end
end
