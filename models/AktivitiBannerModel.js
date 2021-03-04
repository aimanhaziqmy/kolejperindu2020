const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BannerSchema = new Schema ({
    gambar : {
        type: String,
        required : true,
    },
    tajuk : {
        type: String,
    },
    penerangan : {
        type : String,
    },
});

module.exports = mongoose.model('banner',BannerSchema); 