class ApplicationController < ActionController::API
    include ActionController::Cookies

    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_response
    private

    before_action :authorize

    def authorize
        if session[:user_id].nil?
          render json: { errors: ["No session or user ID found"] }, status: :unauthorized
          return
        end
      
        @current_user = User.find_by(id: session[:user_id])
      
        if @current_user.nil?
          Rails.logger.info("Authorization failed: #{session[:user_id] ? 'User not found' : 'No session or user ID'}")
          render json: { errors: ["User not found for this session ID"] }, status: :unauthorized
        else
          Rails.logger.info("User authenticated: #{@current_user.inspect}")
        end
    end

    def unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
end
