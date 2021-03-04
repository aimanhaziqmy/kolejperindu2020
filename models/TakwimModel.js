//jshint esnext : true
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TakwimSchema = new Schema ({
    
    tarikh: {
        type: Date,
        default : Date.now(),
    },
    file : {
        type: String,
        default : 'def4ult.jpg',
    }
    
}); 

module.exports = mongoose.model('takwim',TakwimSchema);