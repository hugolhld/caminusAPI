terraform {
  required_providers {
    heroku = {
      source = "heroku/heroku"
      version = "3.2.0"
    }
  }
}

variable "heroku_email" {
  description = "Heroku admin email"
  type        = string
  sensitive   = true
}

variable "heroku_api_key" {
  description = "Heroku api key"
  type        = string
  sensitive   = true
}

provider "heroku" {
    email = var.heroku_email
    api_key = var.heroku_api_key
}