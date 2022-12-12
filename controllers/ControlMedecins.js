var modelMedecin = require('../models/ModelMedecins');
module.exports = {
    //afficher la liste des Medecines avec leurs données
    afficher_liste_medecins: function (req, res) {
        modelMedecin.afficher_liste_medecins(function (data) {
            res.render('./liste_medecins', { valid: req.flash('valid'), erreur: req.flash('erreur'), contenu: data, titre: "Les médecins" });
        });
    },
    //afficher le formulaire d'ajout de Medecins
    afficher_formulaire_medecin: function (req, res) {
        modelMedecin.afficher_formulaire_medecin(function (data) {
            res.render('./formulaire_medecin', { valid: req.flash('valid'), erreur: req.flash('erreur'), contenu: data, titre: "formulaire médecin" })
        });
    },
    //afficher une fiche individuelle sous formulairee de formulaire pour chaque Medecin, permettant également de modifier les données
    afficher_fiche_medecin: function (req, res) {
        let id = req.params.id;
        modelMedecin.afficher_fiche_medecin(id, function (data) {
            res.render('./fiche_medecin', { valid: req.flash('valid'), erreur: req.flash('erreur'), contenu: data, titre: "Fiche médecin" })
        });
    },
    //éxécuter le formulaire d'ajout de Medecin
    executer_formulaire_medecin: function (req, res) {
        let Medecins_nom = req.body.inputNom
        let Medecins_prenom = req.body.inputPrenom
        let Medecins_mail = req.body.inputEmail
        let Medecins_tel = req.body.inputTel
        let Medecins_noOrdre = req.body.inputOrdre
        
        if (Medecins_nom === "" || Medecins_prenom === "" || Medecins_mail === "" || Medecins_tel === "" || Medecins_noOrdre === "") {
            req.flash('erreur', 'Remplir tout les champs');
            res.redirect('./formulaire_medecin')
        } else {
            Medecins_tel = Medecins_tel.split(' ').join('')
            let medecinParam = { Medecins_noOrdre, Medecins_nom, Medecins_prenom, Medecins_tel, Medecins_mail }
            modelMedecin.executer_formulaire_medecin(medecinParam, function (data) {
                req.flash('valid', 'Ajout de médecin terminé');
                res.redirect('./liste_medecins')
            })
        }
    },
    //éxécuter le formulaire de modification des données Medecins
    update_formulaire_medecin: function (req, res) {
        let id = req.params.id
        
        let Medecins_nom = req.body.inputNom
        let Medecins_prenom = req.body.inputPrenom
        let Medecins_mail = req.body.inputEmail
        let Medecins_tel = req.body.inputTel
        let Medecins_noOrdre = req.body.inputOrdre
        if (Medecins_nom === "" || Medecins_prenom === "" || Medecins_mail === "" || Medecins_tel === "" || Medecins_noOrdre === "") {
            req.flash('erreur', 'Remplir tout les champs');
            res.redirect('./../fiche_medecin/' + id)
        } else {
            Medecins_tel = Medecins_tel.split(' ').join('')
            
            let medecinParam = { Medecins_noOrdre, Medecins_nom, Medecins_prenom, Medecins_tel, Medecins_mail }
            modelMedecin.update_formulaire_medecin([medecinParam, id], function (data) {
                req.flash('valid', 'Modification de médecin terminé');
                res.redirect('./../liste_medecins')
            })
        }
    },
    //supprimer les données sur un medecin 
    delete_fiche_medecin: function (req, res) {
        id = req.params.id
        modelMedecin.delete_fiche_medecin(id, function (data) {
            req.flash('valid', 'Supression de médecin terminé');
            res.redirect('./../liste_medecins')
        });
    }
}