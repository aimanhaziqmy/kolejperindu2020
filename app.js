const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const {
    mongoDbUrl,
    PORT,
    globalVariables,
} = require('./config/configuration');
const hbs = require('express-handlebars');
const defaultRoutes = require('./routes/defaultRoutes');
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');
const flash = require('connect-flash');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const Handlebars = require('handlebars');
const methodOverride = require('method-override');
const {
    selectOption
} = require('./config/customFunction');
const passport = require('passport');
const app = express();

mongoose.connect(mongoDbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(response => {
        console.log('Database are connected successfully');
    }).catch(err => {
        console.log('Fail to connect to the database')
    });

/*File Upload Middleware*/
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './public/uploads/',
}));


/*Configure Express*/
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

/*Method override Middleware*/
app.use(methodOverride('newMethod'));
/*Flash and Session*/
app.use(session({
    secret: 'anysecret',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(globalVariables);

/* Passport Initialize */
app.use(passport.initialize());
app.use(passport.session());


/*Setup View Engine to use Handlebars*/
app.engine('handlebars', hbs({
    defaultLayout: 'default',
    helpers: {
        select: selectOption,
    },
}));

app.set('view engine', 'handlebars');


/*Routes*/
app.use('/', defaultRoutes);
app.use('/admin', adminRoutes);
app.use('/student',studentRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
});
