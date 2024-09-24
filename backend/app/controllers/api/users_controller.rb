class Api::UsersController < ApplicationController
    skip_before_action :authorize, only: [:create]

    def index
      users = User.all
      render json: users
    end

    def create
        begin
          user = User.create!(user_params)
          session[:user_id] = user.id
          puts "Session User ID Set: #{session[:user_id]}" # Log session user_id
          render json: user, status: :created
        rescue ActiveRecord::RecordInvalid => e
          puts "Failed to save user: #{e.record.errors.full_messages}"
          render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
        end
      end

    def show
        render json: @current_user
    end

    private

    def user_params
        params.require(:user).permit(:email, :first_name, :last_name, :password, :password_confirmation)
    end
end
