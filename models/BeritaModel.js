const mongoose = require('mongoose');
var moment = require('moment-timezone');
var malaysiaTime = moment().tz("Asia/Kuala_Lumpur").format("LL");
const Schema = mongoose.Schema;
const BeritaSchema = new Schema ({
    tajuk : {
        type: String,
        required : true,
    },
    penerangan : {
        type : String, 
        required : true,
    },
    bolehDilihat : {
        type : Boolean,
        default : true,
    },
    tarikh : {
        type : Date,
        default : malaysiaTime,
    },
    kandungan : {
        type : String,
        required : true,
    },
    gambar : {
        type : String,
        default : '',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
});

module.exports = mongoose.model('berita',BeritaSchema); 