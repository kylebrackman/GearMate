# initializers/backblaze.rb
require 'aws-sdk-s3'

backblaze_credentials = Aws::Credentials.new(
  ENV['BACKBLAZE_KEY_ID'],
  ENV['BACKBLAZE_APP_KEY']
)

BACKBLAZE_S3_CLIENT = Aws::S3::Client.new(
  credentials: backblaze_credentials,
  endpoint: 'https://s3.us-west-004.backblazeb2.com',
  force_path_style: true,
  region: 'us-west-004',  # Replace with your region
  compute_checksums: false
)