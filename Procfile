web: cd backend && bundle exec rails s
release: cd backend && bin/rake db:migrate
build: cd client && npm install && npm run build && cp -a ./dist/. ../backend/public/
