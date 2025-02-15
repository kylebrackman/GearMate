# Initializers README

## How it Works
The config/initializers folder in a Ruby on Rails application contains Ruby scripts that are executed when the application boots. These scripts are used to configure the application's settings, extend Rails functionality, and initialize third-party libraries.

When Rails starts, it loads the files in config/initializers after loading the framework and the application’s environment but before handling requests. This allows you to set up configurations that will persist throughout the application's runtime.
- Many Gems, such as lograge, require configuration before use
- Another use case is storing constants that are used across the app
  - Time zones
