kzAppAuthService = angular.module "kzApp.services.auth", ['ngResource']

kzAppAuthService.factory 'authService', ['$window', '$resource', 'cfgUrls', ($window, $resource, cfgUrls) ->
  logIn: ->
    $resource "#{cfgUrls.apiBase}session.json", {}, {}
      
  logOut: ->
    if this.isAuthenticated
      $window.sessionStorage.removeItem('token')
      return true
    else
      return false

  isAuthenticated: ->
    !!$window.sessionStorage.token

  getToken: ->
    if this.isAuthenticated
      return $window.sessionStorage.token
    else
      console.log 'derp'
      return false
]