web: cd backend && bundle exec rails s
release: cd backend && bin/rails db:migrate
build: cd client && npm install && npm run build && cp -a ./build/. ../backend/public/