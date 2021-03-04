const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PelajarSchema = new Schema({
    nama: {
        type: String,
        required: true,
    },
    noMatrik: {
        type: String,
        required: true,
    },
    noBilik: {
        type: String,
        required: true,
    },
    rekod: [
        {
            idAktiviti: {
                type: Schema.Types.ObjectId,
                ref: 'aktiviti'
            },
            tajukAktiviti: {
                type: String,
            },
        }
    ],
});

module.exports = mongoose.model('pelajar', PelajarSchema);
