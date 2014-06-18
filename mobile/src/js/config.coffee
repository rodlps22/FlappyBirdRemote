angular.module "kzApp.config", []

kzApp.config [
  "$stateProvider"
  "$urlRouterProvider"
  "$sceDelegateProvider"
  "$httpProvider"
  ($stateProvider, $urlRouterProvider, $sceDelegateProvider, $httpProvider, $stateParams) ->

    # Routes config
    $stateProvider.state("welcome",
      url: "/welcome"
      templateUrl: "slim/welcome.html"
      controller: "welcomeController"
    )
    
    
    # Default route
    $urlRouterProvider.otherwise "/welcome"

    # Allow external URLs
    $sceDelegateProvider.resourceUrlWhitelist [
      "self"
      "http://*localbost"
    ]

    return
]

kzApp.constant 'cfgUrls',
  apiBase: 'http://192.168.1.22:8000/'
  socket: 'http://192.168.1.22:4000/'

  
kzApp.run ['$rootScope', '$location', '$state', 'cfgUrls', ($rootScope, $location, $state, cfgUrls) ->
    
]



