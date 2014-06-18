
io = io.connect()

// Emit ready event.
io.emit('game_ready');

// Listen for the talk event.
io.on('game_remote_ready', function(data) {  
  io.emit('game_ready');
  if( $('#game_div').css('display') == 'none' )
  {
    $('#game_div').fadeIn();
    game.state.add('main', main_state);  
    game.state.start('main'); 
  }
});

io.on('game_start', function(data) {  
  console.log('start game')
  main_state.restart_game();
});

io.on('game_jump', function(data) {  
  console.log('game_jump');
  main_state.jump();
});

