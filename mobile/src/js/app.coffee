kzApp = angular.module "kzApp", [
  "ionic"
  "kzApp.config"

  # Controllers
  "kzApp.controllers.app"
  "kzApp.controllers.welcome"
  
  # Services
  "kzApp.services.auth"
  "kzApp.services.socket"

  # Directives
  "kzApp.directives.passconfirm"

  # Filters
  "kzApp.filters.ucfirst"

  # Stuff
  "ionic"
  "ui.router"
]