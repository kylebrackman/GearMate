# config/initializers/searchkick.rb

Searchkick.client =
  if Rails.env.production?
    Elasticsearch::Client.new(
      url: ENV['BONSAI_URL'], # Use Bonsai Elasticsearch URL in production
      retry_on_failure: true,
      transport_options: { request: { timeout: 250 } }
    )
  else
    Elasticsearch::Client.new(
      hosts: ["http://elasticsearch:9200"], # Local Elasticsearch for development
      retry_on_failure: true,
      transport_options: { request: { timeout: 250 } }
    )
  end
