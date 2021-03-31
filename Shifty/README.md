# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

```cassandraql
bundle install --path vendor/bundle

bundle exec rails db:create

bundle exec rails db:migrate

bundle exec rails db:seed

bundle exec rails s -b 0.0.0.0 -p $your_port
```
