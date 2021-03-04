const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.all('/*', (req,res,next)=> {
    req.app.locals.layout = 'student';
    next();
});

router.route('/')
    .get(studentController.index);

module.exports = router;