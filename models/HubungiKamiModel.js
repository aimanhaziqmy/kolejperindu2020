const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const HubungiSchema = new Schema ({
    nama : {
        type: String,
        required : true,
    },
    email : {
        type : String, 
        required : true,
    },
    tarikh : {
        type : Date,
        default : Date.now(),
    },
    noTelefon: {
        type : String,
        required : true,
    },
    pertanyaan : {
        type : String,
        default : '',
    },
    
    
});

module.exports = mongoose.model('hubungi',HubungiSchema);