module.exports = {
    //mongoDbUrl: 'mongodb+srv://maman:<Password>@kolejperindu.ijzi3.gcp.mongodb.net/Perindu_Website?retryWrites=true&w=majority',
    //mongodb://127.0.0.1:27017/perinduwebs
    mongoDbUrl: process.env.MONGO_URI || 'mongodb+srv://maman:PerinduHebat2020@kolejperindu.ijzi3.gcp.mongodb.net/Perindu_Website?retryWrites=true&w=majority',
    PORT: process.env.PORT || 3000,
    AdminKey : process.env.ADMIN_KEY || "PerinduHebat2020#",
    
    globalVariables: (req, res, next) => {
        res.locals.success_message = req.flash('success-message');
        res.locals.error_message = req.flash('error-message');
        res.locals.user = req.user || null;
        next();
    },
};
