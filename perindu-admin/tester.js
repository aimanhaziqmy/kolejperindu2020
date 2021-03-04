 hantarAktiviti: (req, res) => {
            const kataLaluan1 = req.body.kataLaluan1;
            const kataLaluan2 = req.body.kataLaluan2;
    
            Pelajar.findOne({
                    noMatrik: req.body.noMatrik
                })
                .then(pelajar => {
                    if (!pelajar) {
                        req.flash('error-message', 'Nombor Matrik pelajar tiada di dalam rekod');
                        res.redirect('/e-aktiviti');
                    } else {
                        Aktiviti.findById(req.body.id).then(aktivitis => {
                                if (aktivitis.kataLaluan1 !== kataLaluan1) {
                                    req.flash('error-message', 'Kata laluan anda tidak tepat');
                                    res.redirect('/e-aktiviti');
                                }
                                if (aktivitis.kataLaluan2 !== kataLaluan2) {
                                    req.flash('error-message', 'Kata laluan anda tidak tepat');
                                    res.redirect('/e-aktiviti');
                                } else {
                                    Aktiviti.findById(req.body.id).find({noMatrik : req.body.noMatrik}).then(aktiviti => {
                                        if (aktiviti) {
                                            const newRekod = new Rekod({
                                                pelajar: pelajar.id,
                                                aktiviti: aktiviti.id,
                                            });
    
                                            aktiviti.rekod.push(newRekod);
                                            pelajar.rekod.push(newRekod);
    
                                            aktiviti.noMatrik.push(req.body.noMatrik);
    
                                            aktiviti.save().then(aktivitibaru => {
                                                newRekod.save().then(aktivitipelajar => {
                                                    pelajar.save().then(pelajar => {
                                                        newRekod.save();
                                                    });
                                                    req.flash('success-message', 'Aktiviti anda berjaya direkod');
                                                    res.redirect('/e-aktiviti');
                                                });
                                            });
    
                                        } else {
                                            req.flash('error-flash', 'Rekod penyertaan pelajar telah dihantar');
                                            res.redirect('/e-aktiviti');
    
                                        }
                                    })
    
    
                                }
                            })
                            .catch(error => {
                                req.flash('error-message', 'Sila cuba sebentar lagi');
                                res.redirect('/e-aktiviti');
                            });
                    }
                });
        },
            
            
            hantarAktiviti: (req, res) => {
        const kataLaluan1 = req.body.kataLaluan1;
        const kataLaluan2 = req.body.kataLaluan2;
        const noMatrik = req.body.noMatrik;
        const id = req.body.id;
        Pelajar.findOne({
                noMatrik: noMatrik
            })
            .then(pelajar => {
                if (!pelajar) {
                    req.flash('error-message', 'Nombor Matrik pelajar tiada di dalam rekod');
                    res.redirect('/e-aktiviti');
                } else {
                    Aktiviti.findById(id).findOne({
                        'rekod.noMatrik': noMatrik
                    }).then(aktiviti => {
                        if (aktiviti) {
                            req.flash('error-message', 'Penyertaan pelajar telah direkodkan');
                            res.redirect('/e-aktiviti');


                        } else {

                            console.log(aktiviti);
                            //                            Aktiviti.findById(id).then(rekod => {
                            //                                console.log(rekod);
                            //                                if (rekod.kataLaluan1 !== kataLaluan1) {
                            //                                    req.flash('error-message', 'Kata laluan anda tidak tepat');
                            //                                    res.redirect('/e-aktiviti');
                            //                                }
                            //                                if (rekod.kataLaluan2 !== kataLaluan2) {
                            //                                    req.flash('error-message', 'Kata laluan anda tidak tepat');
                            //                                    res.redirect('/e-aktiviti');
                            //                                } else {
                            //                                    const newRekod = new Rekod({
                            //                                        pelajar: pelajar.id,
                            //                                        aktiviti: aktiviti.id,
                            //                                    });
                            //
                            //                                    aktiviti.rekods.push(newRekod,);
                            //                                    pelajar.rekod.push(newRekod);
                            //
                            //                                    aktiviti.rekods.push(noMatrik);
                            //
                            //                                    aktiviti.save().then(aktivitibaru => {
                            //                                        newRekod.save().then(aktivitipelajar => {
                            //                                            pelajar.save().then(pelajar => {
                            //                                                newRekod.save();
                            //                                            });
                            //                                            req.flash('success-message', 'Aktiviti anda berjaya direkod');
                            //                                            res.redirect('/e-aktiviti');
                            //                                        });
                            //                                    });
                            //                                }
                            //                            });
                        }
                    })
                }
            })
    },
