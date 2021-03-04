const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AktivitiSchema = new Schema({
    tajuk: {
        type: String,
        required: true,
    },
    penerangan: {
        type: String,
    },
    kataLaluan1: {
        type: String,
        required: true,
    },
    kataLaluan2: {
        type: String,
        required: true,
    },
    tarikh: {
        type: Date,
        default: Date.now(),
    },
    diakses: {
        type: Boolean,
        default: false,
    },
    rekods: [
        {
            noMatrik: {
                type: String,
            },
        }
    ],
});

module.exports = mongoose.model('aktiviti', AktivitiSchema);
