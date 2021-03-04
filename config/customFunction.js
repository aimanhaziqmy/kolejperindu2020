module.exports = {
    selectOption: function (status, options) {

        return options.fn(this).replace(new RegExp('value=\"' + status + '\"'), '$&selected="selected"');
    },
    isEmpty: function (obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }

        return true;
    },
    isUserAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/login');
        }
    },

//    today: function () {
//        var options = {
//            weekday: 'long',
//            year: 'numeric',
//            month: 'long',
//            day: 'numeric'
//        };
//        var today = new Date().toLocaleDateString("en-US", options, {
//            timeZone: "Asia/Kuala_Lumpur"
//        });
//        return today
//    }
};
