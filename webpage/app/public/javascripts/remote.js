
io = io.connect()

// Emit ready event.
io.emit('remote_ready');

// Listen for the talk event.

$(function(){
  $('#start').click(function(){
    io.emit('remote_start');
  });
  $('#jump').click(function(){
    io.emit('remote_jump');
  });
  $('#reconnect').click(function(){
    io.emit('remote_ready');
  });
})