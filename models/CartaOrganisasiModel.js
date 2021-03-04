//jshint esnext : true
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartaOrganisasiSchema = new Schema ({
    
    tarikh: {
        type: Date,
        default : Date.now(),
    },
    file : {
        type: String,
        default : 'def4ult.jpg',
    }
     
}); 

module.exports = mongoose.model('cartaOrganisasi',CartaOrganisasiSchema); 