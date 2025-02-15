Rails.application.configure do
  config.lograge.enabled = true
  config.lograge.formatter = Lograge::Formatters::Json.new

  config.lograge.custom_options = lambda do |event|
    {
      time: Time.now.iso8601,
#       host: event.payload[:host],
      params: event.payload[:params].except(*%w(controller action format id)),
#       user_id: event.payload[:user_id],
      request_id: event.payload[:request_id]
    }
  end
end