const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CatatanSchema = new Schema ({
    catatan : {
        type: String,
        required : true,
    },
});

module.exports = mongoose.model('catatan',CatatanSchema); 