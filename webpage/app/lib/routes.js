module.exports = function (app, middleware, HomeController) {

    app.get('/',       HomeController.index);
    app.get('/remote', HomeController.remote);

    app.io.route('remote_ready', function(req) {
      req.io.broadcast('game_remote_ready');
    });

    app.io.route('remote_start', function(req) {
      req.io.broadcast('game_start');
    });
    
    app.io.route('remote_jump', function(req) {
      req.io.broadcast('game_jump');
    });
    
    app.io.route('game_ready', function(req) {
      req.io.broadcast('game_ready');
    });

    app.io.route('score_game', function(req) {
      req.io.broadcast('score_game', { 'score_game': req.data.score_game });
    });

};
