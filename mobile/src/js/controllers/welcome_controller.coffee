appWelcomeController = angular.module "kzApp.controllers.welcome", []

appWelcomeController.controller "welcomeController", ["$scope", "$ionicLoading", "socket", "$ionicPopup", "$rootScope", ($scope, $ionicLoading, $socket, $ionicPopup, $rootScope) -> 
  
  $scope.status = "Welcome"
  $scope.score_game = ""
  $scope.data = {key: null}
  $scope.enabled = false;


  connect = ->
    $scope.status = "Key send [" + $scope.data.key + ']'
    $socket.emit('remote_ready', $scope.data);

  $scope.reconect = ->
    if not $scope.data.key?
      $ionicPopup.show(
        template: "<input type=\"text\" name=\"key\" ng-model=\"data.key\">"
        title: "Enter With Key"
        subTitle: "Get The Key on the website"
        scope: $scope
        buttons: [
          {
            text: "Cancel"
          }
          {
            text: "<b>Save</b>"
            type: "button-positive"
            onTap: (e) ->
              unless $scope.data.key
                e.preventDefault()
              else
                $scope.data.key
                connect();
              return
          }
        ]
      )
    else
      connect();

    return

  $scope.jump = ->
    $socket.emit('remote_jump');
    return

  $scope.play = ->
    $scope.status = "Your Score";
    $scope.score_game = "0"
    $socket.emit('remote_start');
    return

  $socket.on('score_game', (data) ->
    $scope.enabled = true;
    $scope.score_game = data.score_game
  )
  $socket.on('game_ready', () ->
    console.log 'true'
    $scope.enabled = true;
  )

]
