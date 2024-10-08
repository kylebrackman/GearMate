Rails.application.routes.draw do
  resources :locations
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

    # Item routes
    resources :items

    # Profile routes
    resources :profiles

    # User routes
    resources :users

    # Rental routes
    resources :rentals

    # Rental request routes
    resources :rental_requests

    get '/received_pending_rental_requests', to: 'rental_requests#received_pending_rental_requests'
    get '/received_pending_rental_request/:id', to: 'rental_requests#received_pending_rental_request_id'

    patch '/approve_rental_request/:id', to: 'rental_requests#approve_rental_request'


  end
end
