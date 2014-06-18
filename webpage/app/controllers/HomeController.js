module.exports = function () {
    return {

        // Landing page
        index: function (req, res, next) {
            res.render('index');
        },
        remote: function (req, res, next) {
          res.render('remote');
        }
    };
};