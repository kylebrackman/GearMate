class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  after_update :log_update

  private

  def log_update
    changed_attributes = self.previous_changes.except("updated_at") # Ignore timestamps

    if changed_attributes.present?
      log_message = "#{self.class.name} #{id} updated. Changes: #{changed_attributes.to_json}"
      Rails.logger.info log_message

      # Write to log file
      log_file_path = Rails.root.join("log", "#{Rails.env}_updates.log")
      File.open(log_file_path, 'a') { |f| f.puts(log_message) }

      # Upload log to Backblaze asynchronously
      LogUploadJob.perform_later(log_file_path.to_s, Time.current)
    end
  end

end
