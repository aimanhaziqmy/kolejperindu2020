const Berita = require('../models/BeritaModel');
const Carta = require('../models/CartaOrganisasiModel');
const Jpk = require('../models/JpkModel');
const Mb = require('../models/MbModel');
const Pak = require('../models/PakModel');
const Pengetua = require('../models/PengetuaModel');
const Srk = require('../models/SrkModel');
const Takwim = require('../models/TakwimModel');
const Aduan = require('../models/AduanModel');
const Hubungi = require('../models/HubungiKamiModel');
const Aktiviti = require('../models/AktivitiModel');
const Pelajar = require('../models/PelajarModel');
const Rekod = require('../models/RekodAktivitiModel');
const Banner = require('../models/AktivitiBannerModel');
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const Home = require('../models/HomeModel');
const {
    isEmpty
} = require('../config/customFunction');
const {
    AdminKey
} = require('../config/configuration');


module.exports = {
    index: (req, res) => {
        Berita.find().limit(6).lean().then(berita => {
            Banner.find().lean().then(banner => {
                Home.find().lean().then(home => {
                    res.render('default/index', {
                        berita: berita,
                        banner: banner,
                        home: home,
                    });
                });

            });

        })

    },

    getAkanDatang: (req, res) => {
        res.render('default/akan-datang');
    },

    getBerita: (req, res) => {
        Berita.find().lean()
            .then(berita => {
                res.render('default/berita', {
                    berita: berita
                });
            })
    },

    getBeritaSatu: (req, res) => {
        const id = req.params.id;
        Berita.findById(id).lean()
            .then(berita => {
                if (!berita) {
                    res.status(404).json({
                        message: 'Kandungan tidak ditemui'
                    });
                } else {
                    res.render('default/berita-satu', {
                        berita: berita
                    });
                }
            });
    },

    getCartaOrganisasi: (req, res) => {
        Carta.find().lean().then(carta => {
            res.render('default/carta-organisasi', {
                carta: carta
            });
        })
    },

    //e-Aduan
    getAduan: (req, res) => {
        res.render('default/e-aduan');
    },

    postAduan: (req, res) => {

        let gambar1 = '';
        let gambar2 = '';
        let gambar3 = '';

        if (!isEmpty(req.files)) {
            let file = req.files.gambar1;
            gambar1 = file.name;
            let uploadDir = './public/uploads/';
            file.mv(uploadDir + gambar1, (err) => {
                if (err) throw err;
            });
            if (!isEmpty(req.files.gambar2)) {
                let file = req.files.gambar2;
                gambar2 = file.name;
                let uploadDir = './public/uploads/';
                file.mv(uploadDir + gambar2, (err) => {
                    if (err) throw err;
                });
                if (!isEmpty(req.files.gambar3)) {
                    let file = req.files.gambar3;
                    gambar3 = file.name;
                    let uploadDir = './public/uploads/';
                    file.mv(uploadDir + gambar3, (err) => {
                        if (err) throw err;
                    });
                }
            }
        }



        const newAduan = new Aduan({
            tajuk: req.body.tajuk,
            penerangan: req.body.penerangan,
            ringkasanPengadu: req.body.ringkasanPengadu,
            gambar1: `/uploads/${gambar1}`,
            gambar2: `/uploads/${gambar2}`,
            gambar3: `/uploads/${gambar3}`,

        });

        newAduan.save().then(aduan => {
            console.log(aduan);
            req.flash('success-message', 'Aduan telah dihantar');
            res.redirect('/e-aduan');
        })
    },

    getAktiviti: (req, res) => {
        Aktiviti.find().lean().then(aktiviti => {
            res.render('default/e-aktiviti', {
                aktiviti: aktiviti
            });
        })

    },

    //Aktiviti pelajar : hantar Aktiviti

    hantarAktiviti: (req, res) => {
        Pelajar.findOne({
            noMatrik: req.body.noMatrik
        }).then(pelajar => {
            if (!pelajar) {
                req.flash('error-message', 'Nombor Matrik Pelajar Tiada di Dalam Rekod');
                res.redirect('/e-aktiviti');
            } else {
                Pelajar.findOne({
                    noMatrik: req.body.noMatrik,
                    'rekod.idAktiviti': req.body.id
                }).then(rekod => {
                    if (!rekod) {
                        Aktiviti.findById(req.body.id).then(aktiviti => {

                            if (aktiviti.kataLaluan1 !== req.body.kataLaluan1) {
                                req.flash('error-message', 'Kata laluan anda tidak tepat');
                                res.redirect('/e-aktiviti');
                            }
                            if (aktiviti.kataLaluan2 !== req.body.kataLaluan2) {
                                req.flash('error-message', 'Kata laluan anda tidak tepat');
                                res.redirect('/e-aktiviti');
                            } else {
                                const rPelajar = {
                                    "idAktiviti": req.body.id,
                                    "tajukAktiviti": req.body.tajuk
                                };
                                const rAktviti = {
                                    "noMatrik": req.body.noMatrik
                                };

                                console.log(rPelajar);
                                console.log(rAktviti);
                                pelajar.rekod.push(rPelajar);
                                aktiviti.rekods.push(rAktviti);

                                pelajar.save();
                                aktiviti.save();

                                req.flash('success-message', 'Aktiviti anda berjaya direkodkan');
                                res.redirect('/e-aktiviti');
                            }
                        });

                    } else {
                        req.flash('error-message', 'Penyertaan pelajar telah direkodkan');
                        res.redirect('/e-aktiviti');
                    }
                })


            }
        })

    },


    getPelajar: (req, res) => {
        Pelajar.find().lean().then(pelajar => {
            res.render('default/e-pelajar', {
                pelajar: pelajar
            });
        })

    },

    getHubungiKami: (req, res) => {
        res.render('default/hubungi-kami');
    },

    postHubungiKami: (req, res) => {
        const newHubungi = new Hubungi({
            nama: req.body.nama,
            email: req.body.email,
            noTelefon: req.body.noTelefon,
            pertanyaan: req.body.pertanyaan,
        });

        newHubungi.save().then(hubungi => {
            console.log(hubungi);
            req.flash('success-message', 'Mesej berjaya dihantar');
            res.redirect('/hubungi-kami');
        })
    },

    getJpkPerindu: (req, res) => {
        Jpk.find().lean().then(jpk => {
            res.render('default/jpk-perindu', {
                jpk: jpk
            });
        })
    },

    getLogin: (req, res) => {
        res.render('default/login');
    },

    getMajlisBertindak: (req, res) => {
        Mb.find().lean().then(mb => {
            res.render('default/majlis-bertindak', {
                mb: mb
            });
        })
    },

    getPengetua: (req, res) => {
        Pengetua.find().lean().then(pengetua => {
            res.render('default/pengetua', {
                pengetua: pengetua
            });
        })
    },

    getPengurusAsramaKanan: (req, res) => {
        Pak.find().lean().then(pak => {
            res.render('default/pengurus-asrama-kanan', {
                pak: pak
            });
        })
    },

    getRegister: (req, res) => {
        res.render('default/register');
    },

    postRegister: (req, res) => {

        if (req.body.AdminKey !== AdminKey) {
            req.flash('error-message', 'Admin Key anda tidak tepat');
            res.redirect('/register');

        } else {


            let errors = [];

            if (!req.body.name) {
                errors.push({
                    message: 'Ruang Nama perlu diisi'
                });
            }
            if (!req.body.email) {
                errors.push({
                    message: 'Ruang Email perlu diisi'
                });
            }
            if (!req.body.noTelefon) {
                errors.push({
                    message: 'Ruang No.Telefon perlu diisi'
                });
            }
            if (req.body.password !== req.body.ulangKataLaluan) {
                errors.push({
                    message: 'Kata laluan tidak seragam/ tidak diisi'
                });
            }

            if (errors.length > 0) {
                res.render('default/register', {
                    errors: errors,
                    name: req.body.name,
                    email: req.body.email,
                    noTelefon: req.body.noTelefon,
                });
            } else {
                User.findOne({
                    email: req.body.email
                }).then(user => {
                    if (user) {
                        req.flash('error-message', 'Email sudah didaftarkan.');
                        res.redirect('/login');
                    } else {
                        const newUser = new User(req.body);
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                newUser.password = hash;
                                newUser.save().then(user => {
                                    req.flash('success-message', 'Pengguna baru telah didaftarkan');
                                    res.redirect('/login');
                                });
                            });
                        });
                    }
                });
            }
        }
    },

    getStafResidenKolej: (req, res) => {
        Srk.find().lean().then(srk => {
            res.render('default/staf-residen-kolej', {
                srk: srk
            });
        })
    },

    getTakwim: (req, res) => {
        Takwim.find().lean().then(takwim => {
            res.render('default/takwim', {
                takwim: takwim
            });
        })
    },

    getVisiMisiObjektif: (req, res) => {
        res.render('default/visi-misi-objektif');
    },



};
