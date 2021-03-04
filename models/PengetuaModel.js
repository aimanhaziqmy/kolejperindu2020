const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PengetuaSchema = new Schema ({
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

module.exports = mongoose.model('pengetua',PengetuaSchema); 