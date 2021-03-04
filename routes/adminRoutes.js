const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {
    isUserAuthenticated
} = require('../config/customFunction');

router.all('/*', isUserAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});

router.route('/')
    .get(adminController.index);

//Home kemaskini

router.route('/home')
    .get(adminController.getHome)
    .post(adminController.hantarHome);

router.route('/home/kemaskini/:id')
    .put(adminController.kemaskiniHome);

router.route('/home/padam/:id')
    .delete(adminController.padamHome);
//Berita

router.route('/berita')
    .get(adminController.getBerita);

router.route('/berita/baharu')
    .get(adminController.baharuBerita)
    .post(adminController.hantarBerita);

router.route('/berita/kemaskini/:id')
    .get(adminController.kemaskiniBerita)
    .put(adminController.hantarKemaskiniBerita);

router.route('/berita/padam/:id')
    .delete(adminController.padamBerita);

//Pengetua

router.route('/pengetua')
    .get(adminController.getPengetua);

router.route('/pengetua/baharu')
    .get(adminController.baharuPengetua)
    .post(adminController.hantarPengetua);

router.route('/pengetua/kemaskini/:id')
    .get(adminController.kemaskiniPengetua)
    .put(adminController.hantarKemaskiniPengetua);

router.route('/pengetua/padam/:id')
    .delete(adminController.padamPengetua);

//Staf Residen Kolej

router.route('/srk')
    .get(adminController.getSrk);

router.route('/srk/baharu')
    .get(adminController.baharuSrk)
    .post(adminController.hantarSrk);

router.route('/srk/kemaskini/:id')
    .get(adminController.kemaskiniSrk)
    .put(adminController.hantarKemaskiniSrk);

router.route('/srk/padam/:id')
    .delete(adminController.padamSrk);

// Pengurus Asrama Kanan

router.route('/pak')
    .get(adminController.getPak);

router.route('/pak/baharu')
    .get(adminController.baharuPak)
    .post(adminController.hantarPak);

router.route('/pak/kemaskini/:id')
    .get(adminController.kemaskiniPak)
    .put(adminController.hantarKemaskiniPak);

router.route('/pak/padam/:id')
    .delete(adminController.padamPak);

//JPK

router.route('/jpk')
    .get(adminController.getJpk);

router.route('/jpk/baharu')
    .get(adminController.baharuJpk)
    .post(adminController.hantarJpk);

router.route('/jpk/kemaskini/:id')
    .get(adminController.kemaskiniJpk)
    .put(adminController.hantarKemaskiniJpk);

router.route('/jpk/padam/:id')
    .delete(adminController.padamJpk);

//MB

router.route('/mb')
    .get(adminController.getMb);

router.route('/mb/baharu')
    .get(adminController.baharuMb)
    .post(adminController.hantarMb);

router.route('/mb/kemaskini/:id')
    .get(adminController.kemaskiniMb)
    .put(adminController.hantarKemaskiniMb);

router.route('/mb/padam/:id')
    .delete(adminController.padamMb);

//Takwim

router.route('/takwim')
    .get(adminController.getTakwim)
    .post(adminController.hantarTakwim);

router.route('/takwim/padam/:id')
    .delete(adminController.padamTakwim);


//Carta Organisasi

router.route('/cartaOrganisasi')
    .get(adminController.getCartaOrganisasi)
    .post(adminController.hantarCartaOrganisasi);

router.route('/cartaOrganisasi/padam/:id')
    .delete(adminController.padamCartaOrganisasi);

//HubungiKami
router.route('/hubungiKami')
    .get(adminController.getHubungiKami);

router.route('/hubungiKami/padam/:id')
    .delete(adminController.padamHubungiKami);

//Aduan

router.route('/aduan')
    .get(adminController.getAduan);

router.route('/aduan/:id')
    .get(adminController.lihatAduan);

router.route('/aduan/padam/:id')
    .delete(adminController.padamAduan);

//Catatan

router.route('/catatan')
    .get(adminController.getCatatan)
    .post(adminController.hantarCatatan);

router.route('/catatan/padam/:id')
    .delete(adminController.padamCatatan);

//Pelajar

router.route('/pelajar')
    .get(adminController.getPelajar)
    .post(adminController.hantarPelajar);


router.route('/pelajar/kemaskini/:id')
    .get(adminController.kemaskiniPelajar)
    .put(adminController.hantarKemaskiniPelajar);

router.route('/pelajar/padam/:id')
    .delete(adminController.padamPelajar);


//Aktiviti

router.route('/aktiviti')
    .get(adminController.getAktiviti);

router.route('/aktiviti/diakses/:id')
    .put(adminController.kemaskiniDiakses);

router.route('/aktiviti/baharu')
    .get(adminController.baharuAktiviti)
    .post(adminController.hantarAktiviti);

router.route('/aktiviti/kemaskini/:id')
    .get(adminController.kemaskiniAktiviti)
    .put(adminController.hantarKemaskiniAktiviti);

router.route('/aktiviti/padam/:id')
    .delete(adminController.padamAktiviti);

//banner 

router.route('/banner')
    .get(adminController.getBanner)
    .post(adminController.hantarBanner);

router.route('/banner/padam/:id')
    .delete(adminController.padamBanner);

router.use((req, res, next) => {
    res.status(404).render('admin/404');
});

module.exports = router;
