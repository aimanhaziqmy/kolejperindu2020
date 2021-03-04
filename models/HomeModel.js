const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomeSchema = new Schema({
    fail: {
        type: String,
        default: '',
    },
    video: {
        type: Boolean,
        default: false,
    },
    gambar: {
        type: Boolean,
        default: false,
    },
    aktif: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    }
});

module.exports = mongoose.model('home', HomeSchema);

