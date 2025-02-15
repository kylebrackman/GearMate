class LogUploadJob < ApplicationJob
  queue_as :default

  def perform(log_file_path, date)
    s3 = BACKBLAZE_S3_CLIENT  # Use Backblaze client for log uploads
    bucket = ENV['BACKBLAZE_BUCKET']
    key = "logs/#{Rails.env}/#{date.strftime('%Y/%m/%d')}/#{File.basename(log_file_path)}"

    File.open(log_file_path, 'rb') do |file|
      s3.put_object(
        bucket: bucket,
        key: key,
        body: file
      )
    end

    File.delete(log_file_path) if File.exist?(log_file_path)
  rescue => e
    Rails.logger.error "LogUploadJob: Failed to upload logs to Backblaze: #{e.message}"
  end
end
