class Api::SessionsController < ApplicationController

    skip_before_action :authorize, only: :create
    
    def create
        if params[:email].blank? || params[:password].blank?
            render json: { error: "Email and password are required" }, status: :bad_request
            return
        end

        user = User.find_by(email: params[:email])
        if user && user.authenticate(params[:password])
        session[:user_id] = user.id
        Rails.logger.debug "User logged in, session[:user_id]: #{session[:user_id]}"
        render json: user
        else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
    end

    def destroy
        session.delete :user_id
        session_data = session.to_h
        puts "Session Data After Delete: #{session_data}"
        head :no_content
    end
end
