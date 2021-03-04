const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MbSchema = new Schema ({
    nama : {
        type : String,
        required: true,
    },
    pengenalan : {
        type : String,
        default : ' - ',
    },
    noTelefon : {
        type : String,
        default : ' - ',
    },
    jawatan : {
        type : String,
    },
    multimedia : {
        type : Boolean,
        default : false,
    },
    majlisProtokol : {
        type : Boolean,
        default : false,
    },
    taskForce : { 
        type : Boolean,
        default : false,
    },
    rakanSurau : {
        type : Boolean,
        default : false,
    }, 
    sekretariat : {
        type: Boolean,
        default : false,
    },
    keusahawanan : { 
        type : Boolean,
        default : false, 
    },
    instagram : {
        type : String,
        default : ' - ',
    },
    harijadi : {
        type : String,
        default : ' - ',
    },
    kataHikmah : {
        type : String,
        default : ' - ',
    },
    gambar : {
        type : String,
        default :  'def4ult.jpg',
    },
});

module.exports = mongoose.model('mb',MbSchema);