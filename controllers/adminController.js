const Berita = require('../models/BeritaModel');
const Pengetua = require('../models/PengetuaModel');
const Srk = require('../models/SrkModel');
const Pak = require('../models/PakModel');
const Jpk = require('../models/JpkModel');
const Mb = require('../models/MbModel');
const Takwim = require('../models/TakwimModel');
const CartaOrg = require('../models/CartaOrganisasiModel');
const Hubungi = require('../models/HubungiKamiModel');
const Aduan = require('../models/AduanModel');
const Catatan = require('../models/CatatanModel');
const Pelajar = require('../models/PelajarModel');
const Aktiviti = require('../models/AktivitiModel');
const Banner = require('../models/AktivitiBannerModel');
const User = require('../models/UserModel');
const Home = require('../models/HomeModel');
const fs = require('fs');
const crypto = require('crypto');

//delete the photos 
function deletePhoto(path) {
    try {
        fs.unlinkSync(path)
    } catch (err) {
        console.error(err);
    }
}

//renaming the file in manner
function standardName(nameCategories, gambar) {
    gambar = gambar.replace(/ /g, "_")
    return nameCategories + crypto.randomBytes(16).toString('hex') + gambar ;
}



const {
    isEmpty
} = require('../config/customFunction');

module.exports = {
    index: (req, res) => {
        Pelajar.find().lean().then(pelajar => {
            Hubungi.find().lean().then(hubungi => {
                Aduan.find().lean().then(aduan => {
                    Aktiviti.find().lean().then(aktiviti => {
                        res.render('admin/index', {
                            pelajar: pelajar,
                            hubungi: hubungi,
                            aduan: aduan,
                            aktiviti: aktiviti
                        });
                    })
                })
            })
        })

    },

    //Home-------------------------------------------

    getHome: (req, res) => {
        Home.find().lean().then(home => {
            res.render('admin/home', {
                home: home
            });
        });
    },

    hantarHome: (req, res) => {

        const video1 = req.body.video ? true : false;
        const gambar1 = req.body.gambar ? true : false;
        const aktif1 = req.body.aktif ? true : false;

        let fail = '';
        if (!isEmpty(req.files)) {
            let file = req.files.fail;
            fail = standardName("home", file.name)
            let uploadDir = './public/uploads/';
            file.mv(uploadDir + fail, (err) => {
                if (err) throw err;
            });
        }

        const newHome = new Home({
            title: req.body.title,
            description: req.body.description,
            video: video1,
            gambar: gambar1,
            aktif: aktif1,
            fail: `/uploads/${fail}`,
        });

        newHome.save().then(home => {
            console.log(home);
            req.flash('success-message', 'Info berjaya dimuatnaik');
            res.redirect('/admin/home')
        })
    },

    kemaskiniHome: (req, res) => {
        const video1 = req.body.video ? true : false;
        const gambar1 = req.body.gambar ? true : false;
        const aktif1 = req.body.aktif ? true : false;
        const id = req.params.id;

        Home.findById(id)
            .then(home => {
                home.title = req.body.title;
                home.description = req.body.description;
                home.video = video1;
                home.gambar = gambar1;
                home.aktif = aktif1;

                home.save().then(kemaskiniHome => {
                    console.log(home);
                    req.flash('success-message', `Maklumat ${kemaskiniHome.title} telah dikemaskini.`);
                    res.redirect('/admin/home');
                });
            });

    },

    padamHome: (req, res) => {
        Home.findByIdAndDelete(req.params.id)
            .then(padamHome => {
                const path = `./public` + padamHome.fail;
                deletePhoto(path)
                req.flash('success-message', `Maklumat ${padamHome.tajuk} telah dipadam`);
                res.redirect('/admin/home');
            });
    },

    //Berita ----------------------------------------

    getBerita: (req, res) => {
        Berita.find().lean().then(beritas => {
            res.render('admin/berita/index', {
                beritas: beritas
            });
        });
    },

    baharuBerita: (req, res) => {
        res.render('admin/berita/create');
    },

    hantarBerita: (req, res) => {
        const bolehDilihati = req.body.bolehDilihat ? true : false;

        let gambar = '';
        if (!isEmpty(req.files)) {
            let file = req.files.gambar;
            //gambar = file.name;
            gambar = standardName("berita", file.name)
            let uploadDir = './public/uploads/';
            //move function come with package we include
            file.mv(uploadDir + gambar, (err) => {
                if (err) throw err;
            });
        }

        const newBerita = new Berita({
            tajuk: req.body.tajuk,
            penerangan: req.body.penerangan,
            bolehDilihat: bolehDilihati,
            kandungan: req.body.kandungan,
            gambar: `/uploads/${gambar}`,
        });

        newBerita.save().then(berita => {
            console.log(berita);
            req.flash('success-message', 'Berita telah diterbitkan');
            res.redirect('/admin/berita');
        });
    },

    kemaskiniBerita: (req, res) => {
        const id = req.params.id;

        Berita.findById(id).lean()
            .then(berita => {
                res.render('admin/berita/edit', {
                    berita: berita
                });
            });
    },

    hantarKemaskiniBerita: (req, res) => {
        const bolehDilihati = req.body.bolehDilihat ? true : false;
        const id = req.params.id;

        Berita.findById(id)
            .then(berita => {
                berita.tajuk = req.body.tajuk;
                berita.penerangan = req.body.penerangan;
                berita.bolehDilihat = req.body.bolehDilihat;
                berita.kandungan = req.body.kandungan;

                berita.save().then(kemaskiniBerita => {
                    req.flash('success-message', `Berita bertajuk ${kemaskiniBerita.title} telah dikemaskini.`);
                    res.redirect('/admin/berita');
                });
            });
    },
    padamBerita: (req, res) => {
        Berita.findByIdAndDelete(req.params.id)
            .then(padamBerita => {
                const path = `./public` + padamBerita.gambar;
                deletePhoto(path)
                req.flash('success-message', `Berita bertajuk ${padamBerita.tajuk} telah dipadam`);
                res.redirect('/admin/berita');
            });
    },

    // Pengetua ------------------------------------

    getPengetua: (req, res) => {
        Pengetua.find().lean()
            .then(pengetua => {
                res.render('admin/pengetua/index', {
                    pengetua: pengetua
                });
            });
    },

    baharuPengetua: (req, res) => {
        res.render('admin/pengetua/create');
    },

    hantarPengetua: (req, res) => {
        let gambar = '';
        if (!isEmpty(req.files)) {
            let file = req.files.gambar;
            //gambar = file.name;
            gambar = standardName("pengetua", file.name)
            let uploadDir = './public/uploads/';
            file.mv(uploadDir + gambar, (err) => {
                if (err) throw err;
            });
        }

        const newPengetua = new Pengetua({
            nama: req.body.nama,
            pengenalan: req.body.pengenalan,
            instagram: req.body.instagram,
            noTelefon: req.body.noTelefon,
            harijadi: req.body.harijadi,
            kataHikmah: req.body.kataHikmah,
            gambar: `/uploads/${gambar}`,
        });

        newPengetua.save().then(pengetua => {
            console.log(pengetua);
            req.flash('success-message', 'Info berjaya dimuatnaik');
            res.redirect('/admin/pengetua');
        });
    },

    kemaskiniPengetua: (req, res) => {
        const id = req.params.id;
        Pengetua.findById(id).lean()
            .then(pengetua => {
                res.render('admin/pengetua/edit', {
                    pengetua: pengetua
                });
            });
    },

    hantarKemaskiniPengetua: (req, res) => {
        const id = req.params.id;
        Pengetua.findById(id)
            .then(pengetua => {
                pengetua.nama = req.body.nama;
                pengetua.pengenalan = req.body.pengenalan;
                pengetua.instagram = req.body.instagram;
                pengetua.noTelefon = req.body.noTelefon;
                pengetua.harijadi = req.body.harijadi;
                pengetua.kataHikmah = req.body.kataHikmah;

                pengetua.save().then(kemaskiniPengetua => {
                    req.flash('success-message', `Info ${kemaskiniPengetua.nama} telah berjaya dikemaskini`);
                    res.redirect('/admin/pengetua');
                });
            });
    },

    padamPengetua: (req, res) => {
        Pengetua.findByIdAndDelete(req.params.id)
            .then(pengetuaPadam => {
                const path = `./public` + pengetuaPadam.gambar;
                deletePhoto(path)
                req.flash('success-message', `Info ${pengetuaPadam.nama} telah berjaya dipadam`);
                res.redirect('/admin/pengetua');
            });
    },

    //SRK ------------------------------------------

    getSrk: (req, res) => {
        Srk.find().lean()
            .then(srk => {
                res.render('admin/srk/index', {
                    srk: srk
                });
            });
    },

    baharuSrk: (req, res) => {
        res.render('admin/srk/create');
    },

    hantarSrk: (req, res) => {
        let gambar = '';
        if (!isEmpty(req.files)) {
            let file = req.files.gambar;
            //gambar = file.name;
            gambar = standardName("srk", file.name)
            let uploadDir = './public/uploads/';
            file.mv(uploadDir + gambar, (err) => {
                if (err) throw err;
            });
        }

        const newSrk = new Srk({
            nama: req.body.nama,
            pengenalan: req.body.pengenalan,
            instagram: req.body.instagram,
            noTelefon: req.body.noTelefon,
            jawatan: req.body.jawatan,
            harijadi: req.body.harijadi,
            kataHikmah: req.body.kataHikmah,
            gambar: `/uploads/${gambar}`,
        });

        newSrk.save().then(srk => {
            console.log(srk);
            req.flash('success-message', 'Info berjaya dimuatnaik');
            res.redirect('/admin/srk');
        });
    },

    kemaskiniSrk: (req, res) => {
        const id = req.params.id;
        Srk.findById(id).lean()
            .then(srk => {
                res.render('admin/srk/edit', {
                    srk: srk
                });
            });
    },

    hantarKemaskiniSrk: (req, res) => {
        const id = req.params.id;
        Srk.findById(id)
            .then(srk => {
                srk.nama = req.body.nama;
                srk.pengenalan = req.body.pengenalan;
                srk.instagram = req.body.instagram;
                srk.noTelefon = req.body.noTelefon;
                srk.jawatan = req.body.jawatan;
                srk.harijadi = req.body.harijadi;
                srk.kataHikmah = req.body.kataHikmah;

                srk.save().then(kemaskiniSrk => {
                    req.flash('success-message', `Info ${kemaskiniSrk.nama} telah berjaya dikemaskini`);
                    res.redirect('/admin/srk');
                });
            });
    },

    padamSrk: (req, res) => {
        Srk.findByIdAndDelete(req.params.id)
            .then(srkPadam => {
                const path = `./public` + srkPadam.gambar;
                deletePhoto(path)
                req.flash('success-message', `Info ${srkPadam.nama} telah berjaya dipadam`);
                res.redirect('/admin/srk');
            });
    },

    //PAK ---------------------------------------

    getPak: (req, res) => {
        Pak.find().lean()
            .then(pak => {
                res.render('admin/pak/index', {
                    pak: pak
                });
            });
    },

    //post baharu

    baharuPak: (req, res) => {
        res.render('admin/pak/create');
    },

    //hantar post

    hantarPak: (req, res) => {
        let gambar = '';
        if (!isEmpty(req.files)) {
            let file = req.files.gambar;
            //gambar = file.name;
            gambar = standardName("pak", file.name)
            let uploadDir = './public/uploads/';
            file.mv(uploadDir + gambar, (err) => {
                if (err) throw err;
            });
        }

        const newPak = new Pak({
            nama: req.body.nama,
            pengenalan: req.body.pengenalan,
            instagram: req.body.instagram,
            noTelefon: req.body.noTelefon,
            jawatan: req.body.jawatan,
            harijadi: req.body.harijadi,
            kataHikmah: req.body.kataHikmah,
            gambar: `/uploads/${gambar}`,
        });

        newPak.save().then(pak => {
            console.log(pak);
            req.flash('success-message', 'Info berjaya dimuatnaik');
            res.redirect('/admin/pak');
        });
    },

    //kemaskini post

    kemaskiniPak: (req, res) => {
        const id = req.params.id;
        Pak.findById(id).lean()
            .then(pak => {
                res.render('admin/pak/edit', {
                    pak: pak
                });
            });
    },
    //hantar post yang telah dikemaskini

    hantarKemaskiniPak: (req, res) => {
        const id = req.params.id;
        Pak.findById(id)
            .then(pak => {
                pak.nama = req.body.nama;
                pak.pengenalan = req.body.pengenalan;
                pak.instagram = req.body.instagram;
                pak.noTelefon = req.body.noTelefon;
                pak.jawatan = req.body.jawatan;
                pak.harijadi = req.body.harijadi;
                pak.kataHikmah = req.body.kataHikmah;

                pak.save().then(kemaskiniPak => {
                    req.flash('success-message', `Info ${kemaskiniPak.nama} telah berjaya dikemaskini`);
                    res.redirect('/admin/pak');
                });
            });
    },
    //padam post
    padamPak: (req, res) => {
        Pak.findByIdAndDelete(req.params.id)
            .then(pakPadam => {
                const path = `./public` + pakPadam.gambar;
                deletePhoto(path)
                req.flash('success-message', `Info ${pakPadam.nama} telah berjaya dipadam`);
                res.redirect('/admin/pak');
            });
    },

    //JPK ----------------------------------------------

    getJpk: (req, res) => {
        Jpk.find().lean()
            .then(jpk => {
                res.render('admin/jpk/index', {
                    jpk: jpk
                });
            });
    },

    //post baharu

    baharuJpk: (req, res) => {
        res.render('admin/jpk/create');
    },

    //hantar post

    hantarJpk: (req, res) => {
        let gambar = '';
        if (!isEmpty(req.files)) {
            let file = req.files.gambar;
            //gambar = file.name;
            gambar = standardName("jpk", file.name)
            let uploadDir = './public/uploads/';
            file.mv(uploadDir + gambar, (err) => {
                if (err) throw err;
            });
        }



        const newJpk = new Jpk({
            nama: req.body.nama,
            pengenalan: req.body.pengenalan,
            instagram: req.body.instagram,
            noTelefon: req.body.noTelefon,
            jawatan: req.body.jawatan,
            harijadi: req.body.harijadi,
            kataHikmah: req.body.kataHikmah,
            gambar: `/uploads/${gambar}`,
        });

        newJpk.save().then(jpk => {
            console.log(jpk);
            req.flash('success-message', 'Info berjaya dimuatnaik');
            res.redirect('/admin/jpk');
        });
    },

    //kemaskini post

    kemaskiniJpk: (req, res) => {
        const id = req.params.id;
        Jpk.findById(id).lean()
            .then(jpk => {
                res.render('admin/jpk/edit', {
                    jpk: jpk
                });
            });
    },
    //hantar post yang telah dikemaskini

    hantarKemaskiniJpk: (req, res) => {
        const id = req.params.id;
        Jpk.findById(id)
            .then(jpk => {
                jpk.nama = req.body.nama;
                jpk.pengenalan = req.body.pengenalan;
                jpk.instagram = req.body.instagram;
                jpk.noTelefon = req.body.noTelefon;
                jpk.jawatan = req.body.jawatan;
                jpk.harijadi = req.body.harijadi;
                jpk.kataHikmah = req.body.kataHikmah;

                jpk.save().then(kemaskiniJpk => {
                    req.flash('success-message', `Info ${kemaskiniJpk.nama} telah berjaya dikemaskini`);
                    res.redirect('/admin/jpk');
                });
            });
    },
    //padam post
    padamJpk: (req, res) => {
        Jpk.findByIdAndDelete(req.params.id)
            .then(jpkPadam => {
                const path = `./public` + jpkPadam.gambar;
                deletePhoto(path)
                req.flash('success-message', `Info ${jpkPadam.nama} telah berjaya dipadam`);
                res.redirect('/admin/jpk');
            });
    },

    //MB----------------------------------

    getMb: (req, res) => {
        Mb.find().lean()
            .then(mb => {
                res.render('admin/mb/index', {
                    mb: mb
                });
            });
    },

    //post baharu

    baharuMb: (req, res) => {
        res.render('admin/mb/create');
    },

    //hantar post

    hantarMb: (req, res) => {

        //For all the checkBox
        const multimedia1 = req.body.multimedia ? true : false;
        const majlisProtokol1 = req.body.majlisProtokol ? true : false;
        const taskForce1 = req.body.taskForce ? true : false;
        const rakanSurau1 = req.body.rakanSurau ? true : false;
        const sekretariat1 = req.body.sekretariat ? true : false;
        const keusahawanan1 = req.body.keusahawanan ? true : false;

        let gambar = '';
        if (!isEmpty(req.files)) {
            let file = req.files.gambar;
            //gambar = file.name;
            gambar = standardName("mb", file.name)
            let uploadDir = './public/uploads/';
            file.mv(uploadDir + gambar, (err) => {
                if (err) throw err;
            });
        }

        const newMb = new Mb({
            nama: req.body.nama,
            pengenalan: req.body.pengenalan,
            instagram: req.body.instagram,
            noTelefon: req.body.noTelefon,
            multimedia: multimedia1,
            majlisProtokol: majlisProtokol1,
            taskForce: taskForce1,
            rakanSurau: rakanSurau1,
            sekretariat: sekretariat1,
            keusahawanan: keusahawanan1,
            jawatan: req.body.jawatan,
            harijadi: req.body.harijadi,
            kataHikmah: req.body.kataHikmah,
            gambar: `/uploads/${gambar}`,
        });

        newMb.save().then(mb => {
            console.log(mb);
            req.flash('success-message', 'Info berjaya dimuatnaik');
            res.redirect('/admin/mb');
        });
    },

    //kemaskini post

    kemaskiniMb: (req, res) => {
        const id = req.params.id;
        Mb.findById(id).lean()
            .then(mb => {
                res.render('admin/mb/edit', {
                    mb: mb
                });
            });
    },
    //hantar post yang telah dikemaskini

    hantarKemaskiniMb: (req, res) => {
        const multimedia1 = req.body.multimedia ? true : false;
        const majlisProtokol1 = req.body.majlisProtokol ? true : false;
        const taskForce1 = req.body.taskForce ? true : false;
        const rakanSurau1 = req.body.rakanSurau ? true : false;
        const sekretariat1 = req.body.sekretariat ? true : false;
        const keusahawanan1 = req.body.keusahawanan ? true : false;
        const id = req.params.id;
        Mb.findById(id)
            .then(mb => {
                mb.nama = req.body.nama;
                mb.pengenalan = req.body.pengenalan;
                mb.instagram = req.body.instagram;
                mb.noTelefon = req.body.noTelefon;
                mb.multimedia = req.body.multimedia;
                mb.majlisProtokol = req.body.majlisProtokol;
                mb.taskForce = req.body.taskForce;
                mb.rakanSurau = req.body.rakanSurau;
                mb.sekretariat = req.body.sekretariat;
                mb.keusahawanan = req.body.keusahawanan;
                mb.jawatan = req.body.jawatan;
                mb.harijadi = req.body.harijadi;
                mb.kataHikmah = req.body.kataHikmah;

                mb.save().then(kemaskiniMb => {
                    req.flash('success-message', `Info ${kemaskiniMb.nama} telah berjaya dikemaskini`);
                    res.redirect('/admin/mb');
                });
            });
    },
    //padam post
    padamMb: (req, res) => {
        Mb.findByIdAndDelete(req.params.id)
            .then(mbPadam => {
                const path = `./public` + mbPadam.gambar;
                deletePhoto(path)
                req.flash('success-message', `Info ${mbPadam.nama} telah berjaya dipadam`);
                res.redirect('/admin/mb');
            });
    },

    //Takwim------------------------------------------------

    getTakwim: (req, res) => {
        Takwim.find().lean()
            .then(takwim => {
                res.render('admin/takwim/index', {
                    takwim: takwim
                });
            });
    },

    hantarTakwim: (req, res) => {

        let filename = '';
        if (!isEmpty(req.files)) {
            let file = req.files.file;
            //filename = file.name;
            filename = standardName("takwim", file.name)
            let uploadDir = './public/uploads/';
            file.mv(uploadDir + filename, (err) => {
                if (err) throw err;
            });
        }

        const newTakwim = new Takwim({
            file: `/uploads/${filename}`,
        });

        newTakwim.save().then(takwim => {
            console.log(takwim);
            req.flash('success-message', 'Info berjaya dimuatnaik');
            res.redirect('/admin/takwim');
        });
    },

    //padam post
    padamTakwim: (req, res) => {
        Takwim.findByIdAndDelete(req.params.id)
            .then(takwimPadam => {
                const path = `./public` + takwimPadam.gambar;
                deletePhoto(path)
                req.flash('success-message', `Info ${takwimPadam.file} telah berjaya dipadam`);
                res.redirect('/admin/takwim');
            });
    },

    //Carta Organisasi -----------------------------------------
    getCartaOrganisasi: (req, res) => {
        CartaOrg.find().lean()
            .then(cartaOrganisasi => {
                res.render('admin/cartaOrganisasi/index', {
                    cartaOrganisasi: cartaOrganisasi
                });
            });
    },

    hantarCartaOrganisasi: (req, res) => {

        let filename = '';
        if (!isEmpty(req.files)) {
            let file = req.files.file;
            //filename = file.name;
            filename = standardName("cartaOrg", file.name)
            let uploadDir = './public/uploads/';
            file.mv(uploadDir + filename, (err) => {
                if (err) throw err;
            });
        }

        const newCartaOrganisasi = new CartaOrg({
            file: `/uploads/${filename}`,
        });

        newCartaOrganisasi.save().then(cartaOrganisasi => {
            console.log(cartaOrganisasi);
            req.flash('success-message', 'Info berjaya dimuatnaik');
            res.redirect('/admin/cartaOrganisasi');
        });
    },

    //padam post
    padamCartaOrganisasi: (req, res) => {
        CartaOrg.findByIdAndDelete(req.params.id)
            .then(cartaOrganisasiPadam => {
                const path = `./public` + cartaOrganisasiPadam.gambar;
                deletePhoto(path)
                req.flash('success-message', `Info ${cartaOrganisasiPadam.file} telah berjaya dipadam`);
                res.redirect('/admin/cartaOrganisasi');
            });
    },

    //HubungiKami -----------------------------------

    getHubungiKami: (req, res) => {
        Hubungi.find().lean().then(hubungi => {
            res.render('admin/hubungiKami/view', {
                hubungi: hubungi
            });
        });
    },

    padamHubungiKami: (req, res) => {
        Hubungi.findByIdAndDelete(req.params.id)
            .then(hubungiPadam => {
                req.flash('success-message', `Mesej dari ${hubungiPadam.nama} berjaya dipadam`);
                res.redirect('/admin/hubungiKami');
            })
    },

    //Aduan

    getAduan: (req, res) => {
        Aduan.find().lean().then(aduan => {
            res.render('admin/aduan/index', {
                aduan: aduan
            });
        });
    },

    lihatAduan: (req, res) => {
        const id = req.params.id;
        Aduan.findById(id).lean().then(aduan => {
            if (!aduan) {
                res.status(404).json({
                    message: 'Aduan tidak dijumpai'
                });
            } else {
                res.render('admin/aduan/view', {
                    aduan: aduan
                });
            }
        })
    },
    padamAduan: (req, res) => {
        Aduan.findByIdAndDelete(req.params.id)
            .then(aduanPadam => {
                const path1 = `./public` + aduanPadam.gambar1;
                const path2 = `./public` + aduanPadam.gambar2;
                const path3 = `./public` + aduanPadam.gambar3;
                deletePhoto(path1)
                deletePhoto(path2)
                deletePhoto(path3)
                req.flash('success-message', `Aduan bertajuk ${aduanPadam.tajuk} telah dipadam`);
                res.redirect('/admin/aduan');
            });
    },

    //catatan---------------------------------

    getCatatan: (req, res) => {
        Catatan.find().lean()
            .then(catat => {
                res.render('admin/catatan/index', {
                    catat: catat
                })
            });
    },

    hantarCatatan: (req, res) => {
        const newCatatan = new Catatan({
            catatan: req.body.catatan,
        });

        newCatatan.save().then(catat => {
            console.log(catat);
            req.flash('success-message', 'Catatan berjaya dihantar');
            res.redirect('/admin/catatan');
        });
    },

    padamCatatan: (req, res) => {
        Catatan.findByIdAndDelete(req.params.id)
            .then(catatPadam => {
                req.flash('success-message', 'Catatan berjaya dipadam');
                res.redirect('/admin/catatan');
            })
    },

    //Pelajar

    getPelajar: (req, res) => {
        Pelajar.find().lean()
            .populate('aktiviti')
            .then(pelajar => {
                res.render('admin/pelajar/index', {
                    pelajar: pelajar
                })
            });
    },

    hantarPelajar: (req, res) => {

        Pelajar.findOne({
            noMatrik: req.body.noMatrik
        }).then(pelajar => {
            if (!pelajar) {
                const newPelajar = new Pelajar({
                    nama: req.body.nama,
                    noBilik: req.body.noBilik,
                    noMatrik: req.body.noMatrik,
                });

                newPelajar.save().then(pelajarPadam => {
                    console.log(pelajarPadam);
                    req.flash('success-message', `Rekod ${pelajarPadam.nama} telah ditambah`);
                    res.redirect('/admin/pelajar');
                });
            } else {
                req.flash('error-message', 'Nombor Matrik Pelajar telah didaftarkan !');
                res.redirect('/admin/pelajar');
            }
        });

    },

    kemaskiniPelajar: (req, res) => {
        const id = req.params.id;
        Pelajar.findById(id).lean()
            .then(pelajar => {
                res.render('admin/pelajar/edit', {
                    pelajar: pelajar
                });
            });
    },
    hantarKemaskiniPelajar: (req, res) => {
        const id = req.params.id;
        Pelajar.findById(id).then(pelajar => {
            pelajar.nama = req.body.nama;
            pelajar.noMatrik = req.body.noMatrik;
            pelajar.noBilik = req.body.noBilik;
            

            pelajar.save().then(kemaskiniPelajar => {
                req.flash('success-message', `Data ${kemaskiniPelajar.nama} telah dikemaskini`);
                res.redirect('/admin/pelajar');
            });
        });
    },

    padamPelajar: (req, res) => {
        Pelajar.findByIdAndDelete(req.params.id)
            .then(pelajarPadam => {
                req.flash('success-message', `Rekod ${pelajarPadam.nama} telah dipadam`);
                res.redirect('/admin/pelajar');
            });
    },


    //Aktiviti --------------------------------------

    getAktiviti: (req, res) => {
        Aktiviti.find().lean().populate('pelajar')
            .then(aktiviti => {
                res.render('admin/aktiviti/index', {
                    aktiviti: aktiviti
                });
            });
    },

    kemaskiniDiakses: (req, res) => {
        const akses = req.body.diakses ? true : false;
        const id = req.params.id;
        Aktiviti.findById(id)
            .then(aktiviti => {
                aktiviti.diakses = akses;

                aktiviti.save().then(kemaskiniAkses => {
                    req.flash('success-message', `Aktiviti ${aktiviti.tajuk} telah dikemaskini`);
                    res.redirect('/admin/aktiviti');
                });
            });
    },

    baharuAktiviti: (req, res) => {
        res.render('admin/aktiviti/create');
    },

    hantarAktiviti: (req, res) => {
        const akses = req.body.diakses ? true : false;
        const newAktiviti = new Aktiviti({
            tajuk: req.body.tajuk,
            penerangan: req.body.penerangan,
            diakses: akses,
            kataLaluan1: req.body.kataLaluan1,
            kataLaluan2: req.body.kataLaluan2,
        });

        newAktiviti.save().then(aktiviti => {
            console.log(aktiviti);
            req.flash('success-message', 'Aktiviti baharu berjaya dimuat naik');
            res.redirect('/admin/aktiviti');
        });
    },

    kemaskiniAktiviti: (req, res) => {
        const id = req.params.id;
        Aktiviti.findById(id).lean().then(aktiviti => {
            res.render('admin/aktiviti/edit', {
                aktiviti: aktiviti
            });
        });
    },

    hantarKemaskiniAktiviti: (req, res) => {
        const akses = req.body.diakses ? true : false;
        const id = req.params.id;

        Aktiviti.findById(id)
            .then(aktiviti => {
                aktiviti.tajuk = req.body.tajuk;
                aktiviti.penerangan = req.body.penerangan;
                aktiviti.diakses = akses;
                aktiviti.kataLaluan1 = req.body.kataLaluan1;
                aktiviti.kataLaluan2 = req.body.kataLaluan2;

                aktiviti.save().then(kemaskiniAktiviti => {
                    req.flash('success-message', `Aktiviti ${kemaskiniAktiviti.tajuk} telah dikemaskini`);
                    res.redirect('/admin/aktiviti');
                });
            });
    },

    padamAktiviti: (req, res) => {
        Aktiviti.findByIdAndDelete(req.params.id)
            .then(padamAktiviti => {
                req.flash('success-message', `Aktviti ${padamAktiviti.tajuk} telah dipadam`);
                res.redirect('/admin/aktiviti');
            });
    },

    //Banner --------------------------------------------------

    getBanner: (req, res) => {
        Banner.find().lean().then(banner => {
            res.render('admin/banner', {
                banner: banner
            });
        });
    },

    hantarBanner: (req, res) => {
        let gambar = '';
        if (!isEmpty(req.files)) {
            let file = req.files.gambar;
            //gambar = file.name;
            gambar = standardName("banner", file.name)
            let uploadDir = './public/uploads/';
            //move function come with package we include
            file.mv(uploadDir + gambar, (err) => {
                if (err) throw err;
            });
        }
        const newBanner = new Banner({
            tajuk: req.body.tajuk,
            penerangan: req.body.penerangan,
            gambar: `/uploads/${gambar}`,
        });

        newBanner.save().then(banner => {
            console.log(gambar);
            req.flash('success-message', 'Banner telah dimuat naik');
            res.redirect('/admin/banner');
        });
    },

    padamBanner: (req, res) => {
        Banner.findByIdAndDelete(req.params.id)
            .then(padamBanner => {
                const path = `./public` + padamBanner.gambar;
                deletePhoto(path)
                req.flash('success-message', 'Baner telah dipadam');
                res.redirect('/admin/banner');
            });
    },


}
