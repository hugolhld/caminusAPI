resource "heroku_app" "app_production" {
  name = "transport-api-1-production"
  region = "eu"
}

resource "heroku_addon" "db_prod" {
  app  = heroku_app.app_production.name
  plan = "heroku-postgresql:hobby-dev"
}

resource "heroku_app" "app_staging" {
  name = "transport-api-1-staging"
  region = "eu"
}

resource "heroku_addon" "db_staging" {
  app  = heroku_app.app_staging.name
  plan = "heroku-postgresql:hobby-dev"
}

resource "heroku_pipeline" "pipeline" {
  name = "transport-api-1"
}

resource "heroku_pipeline_coupling" "stage_staging" {
  app      = heroku_app.staging.name
  pipeline = heroku_pipeline.pipeline.id
  stage    = "staging"
}

resource "heroku_pipeline_coupling" "stage_production" {
  app      = heroku_app.production.name
  pipeline = heroku_pipeline.pipeline.id
  stage    = "production"
}