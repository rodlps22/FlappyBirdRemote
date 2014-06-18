kzAppSocketService = angular.module "kzApp.services.socket", []

kzAppSocketService.factory 'socket', ['$rootScope', 'cfgUrls', ($rootScope, cfgUrls) ->
  socket = {};
  try 
    socket = io.connect(cfgUrls.socket);
  catch err
    console.log err
    return  
  on: (eventName, callback)->
    socket.on( eventName, () ->  
      args = arguments
      $rootScope.$apply( () ->
        callback.apply socket, args
      );
    );
    return
  emit: (eventName, data, callback) ->
    socket.emit( eventName, data, () ->
      args = arguments;
      $rootScope.$apply( () ->
        if callback
          callback.apply socket, args;
      );
    )
    return
]