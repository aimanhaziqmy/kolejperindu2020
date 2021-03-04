const express = require('express');
const router = express.Router();
const defaultController = require('../controllers/defaultController');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'default';
    next();
});

router.route('/')
    .get(defaultController.index);

//Defining local strategy
passport.use(new localStrategy({
    usernameField : 'email',
    passReqToCallback : true,
    
},(req,email,password,done) => {
    User.findOne({email: email}).then(user =>{
        if(!user){
            return done(null,false,req.flash('error-message','Email pengguna tidak dijumpai'));
        }
        bcrypt.compare(password, user.password,(err,passwordMatched) =>{
            if(err) {
                return err;
            }
            if(!passwordMatched){
                return done(null,false,req.flash('error-message','Kata laluan anda tidak tepat'));
            }
            return done(null,user,req.flash('success-message','Login berjaya'));
        });
    });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


router.route('/login')
    .get(defaultController.getLogin)
    .post(passport.authenticate('local',{
    successRedirect: '/admin',
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: true,
    session: true,
}));


router.route('/akan-datang')
    .get(defaultController.getAkanDatang);

router.route('/berita')
    .get(defaultController.getBerita);

router.route('/berita/:id')
    .get(defaultController.getBeritaSatu);

router.route('/carta-organisasi')
    .get(defaultController.getCartaOrganisasi);

//e-aduan
router.route('/e-aduan')
    .get(defaultController.getAduan)
    .post(defaultController.postAduan);

router.route('/e-aktiviti')
    .get(defaultController.getAktiviti)
    .post(defaultController.hantarAktiviti);

router.route('/e-pelajar')
    .get(defaultController.getPelajar);

router.route('/hubungi-kami')
    .get(defaultController.getHubungiKami)
    .post(defaultController.postHubungiKami);

router.route('/jpk-perindu')
    .get(defaultController.getJpkPerindu);

router.route('/majlis-bertindak')
    .get(defaultController.getMajlisBertindak);

router.route('/pengetua')
    .get(defaultController.getPengetua);

router.route('/pengurus-asrama-kanan')
    .get(defaultController.getPengurusAsramaKanan);

router.route('/register')
    .get(defaultController.getRegister)
    .post(defaultController.postRegister);

router.route('/staf-residen-kolej')
    .get(defaultController.getStafResidenKolej);

router.route('/takwim')
    .get(defaultController.getTakwim);

router.route('/visi-misi-objektif')
    .get(defaultController.getVisiMisiObjektif);

router.get('/logout', (req,res) => {
    req.logOut();
    req.flash('success-message','Logout was successfull');
    res.redirect('/');
});

/*
router.use((req, res, next) => {
    
    res.status(404).render('default/404');
});*/

module.exports = router;
