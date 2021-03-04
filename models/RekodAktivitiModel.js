//jshint esnext:true
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RekodSchema = new Schema({
    pelajar: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    aktiviti: {
        type: Schema.Types.ObjectId,
        ref : 'aktiviti'
    },
    date: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('rekod', RekodSchema);

//
//hantarAktiviti: (req,res) => {
//    const kataLaluan1 = req.body.kataLaluan1;
//    const kataLaluan2 = req.body.kataLaluan2;
//    
//    Pelajar.findOne({noMatrik:req.body.noMatrik})
//        .then(pelajar => {
//            if(!pelajar) {
//                req.flash('error-message','Nombor Matrik pelajar tiada di dalam rekod');
//                res.redirect('/e-aktiviti');
//            }
//            else{
//                Aktiviti.findById(req.body.id).findOne(req.body.noMatrik).then(error => {
//                    req.flash
//                })
//            }
//    })
//}