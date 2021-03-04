//jshint esnext : true
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    noTelefon : {
        type : String,
    },
    password: {
        type : String,
        required: true,
    },
    
});

module.exports = mongoose.model('user',UserSchema);