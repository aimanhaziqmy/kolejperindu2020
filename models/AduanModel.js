const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AduanSchema = new Schema ({
    tajuk : {
        type: String,
        required : true,
    },
    penerangan : {
        type : String, 
        required : true,
    },
    tarikh : {
        type : Date,
        default : Date.now(),
    },
    ringkasanPengadu : {
        type : String,
        required : true,
    },
    gambar1 : {
        type : String,
        default : '',
    },
    gambar2 : {
        type : String,
        default : '',
    },
    gambar3 : {
        type : String,
        default : '',
    },
    
});

module.exports = mongoose.model('aduan',AduanSchema); 