class LogUploadJob < ApplicationJob
  queue_as :default

  def perform(log_data, date)
    s3 = BACKBLAZE_S3_CLIENT
    bucket = ENV['BACKBLAZE_BUCKET']

    # Create a unique filename for the new log file
    timestamp = Time.now.strftime('%Y%m%d_%H%M%S')
    new_filename = "log_#{timestamp}.log"
    new_file_path = Rails.root.join('tmp', new_filename)

    # Write the log data to the new file
    File.open(new_file_path, 'w') do |file|
      file.write(log_data)
    end

    # Create the S3 key for the new file
    key = "logs/#{Rails.env}/#{date.strftime('%Y/%m/%d')}/#{new_filename}"

    # Upload the new file to Backblaze
    File.open(new_file_path, 'rb') do |file|
      s3.put_object(
        bucket: bucket,
        key: key,
        body: file
      )
    end

    # Delete the local file after upload
    File.delete(new_file_path) if File.exist?(new_file_path)

  rescue => e
    Rails.logger.error "LogUploadJob: Failed to upload logs to Backblaze: #{e.message}"
    Rails.logger.error "Backtrace: #{e.backtrace.join("\n")}"
  end
end
