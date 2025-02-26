class Api::UsersController < ApplicationController
    # Todo: review skip before action on get_user_by_fb_id
    skip_before_action :authorize, only: [:create, :get_user_by_fb_id]

    def index
      users = User.all
      render json: users
    end

    def create
        begin
          user = User.create!(user_params)
          session[:user_id] = user.id
          render json: user, status: :created
        rescue ActiveRecord::RecordInvalid => e
          puts "Failed to save user: #{e.record.errors.full_messages}"
          render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        render json: @current_user
    end

    def get_user_by_firebase_id
        @user = User.find_by(firebase_id: params[:firebase_id])
        render json: @user
    end

    private

    def user_params
        params.require(:user).permit(:email, :first_name, :last_name, :password, :password_confirmation)
    end
end
