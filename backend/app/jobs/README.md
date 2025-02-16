## Jobs
In Ruby on Rails, the jobs folder is used to store Active Job classes, which define background tasks that can be run asynchronously. The purpose of using jobs in Rails is to handle time-consuming tasks outside the main request-response cycle, improving performance and user experience.

### Why Use Jobs in Rails?
- **Asynchronous Processing:** Moves long-running tasks (e.g., email delivery, file processing, API calls) out of the main request flow.
- **Performance Optimization:** Speeds up response times by offloading heavy tasks to a background worker.
- **Scalability:** Allows the app to handle multiple background tasks concurrently.
- **Reliability:** Prevents tasks from being lost if the app crashes before completion.  

Todo: Remove custom logging from application and move to Sentry
Files: 
- log_upload_job.rb
- remove log_update in application record
- Audit gems to remove redundancies in logging
- Revisit .env variables

