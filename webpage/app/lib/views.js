var jade = require('jade')
// ,   hbs = require('express-hbs')
,   path = require('path');

module.exports = function (app) {

    //set up view engine
    // app.set('view engine', 'hbs');
    // app.engine('hbs', hbs.express3({
    //     partialsDir:path.join(__dirname, "../views/partials")
    // }));

    // app.set('views', path.join(__dirname, '../views'));
    // app.engine('html', require('ejs').renderFile);

   app.set('views', path.join(__dirname, '../views/'));
   app.set('view engine', 'jade');

};