Rails.application.routes.draw do
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do

    # Check if the user is logged in for context
    get '/me', to: 'users#show'

    # User routes
    post '/signup', to: 'users#create'
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
    # Using firebase uid to find the user in gm database
    # Todo: this is assuming that upon user creation, the fb uid is an attribute on the user
    # Consider making the uid the overall user id
    get '/get_user_by_firebase_id/:firebase_id', to: 'users#get_user_by_firebase_id'

    # Search bar
    get '/item_search', to: 'search#item_search'

    resources :items

    resources :profiles

    resources :users

    get '/user_owned_items/:firebase_id', to: 'users#get_user_owned_items'

    resources :rentals

    resources :rental_requests

    resources :locations

    post '/city_and_state', to: 'locations#city_and_state'

    get '/received_pending_rental_requests', to: 'rental_requests#received_pending_rental_requests'
    get '/received_pending_rental_request/:id', to: 'rental_requests#received_pending_rental_request_id'

    patch '/approve_rental_request/:id', to: 'rental_requests#approve_rental_request'
    patch '/reject_rental_request/:id', to: 'rental_requests#reject'

  end
end

# Todo:

# Create dedicated endpoints for:
# /api/users/:id/items - For owned items
# /api/users/:id/rentals/current - For current rentals
# /api/users/:id/rentals/upcoming - For upcoming rentals
# /api/users/:id/rentals/past - For past rentals
# /api/users/:id/rental_requests/sent - For sent pending requests
# /api/users/:id/rental_requests/received - For received pending requests
# /api/users/:id/rental_requests/approved - For approved requests
