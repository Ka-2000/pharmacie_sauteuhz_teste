var modelMutuelle = require('../models/ModelMutuelles');

module.exports = {
    // afficher la liste des Mutuelle avec leurs données
    afficher_liste_mutuelles: function (req, res) {
        modelMutuelle.afficher_liste_mutuelles(function (data) {
            res.render('./liste_mutuelles', { valid: req.flash('valid'), erreur: req.flash('erreur'), contenu: data, titre: "Les mutuelles" });
        });
    },
    //afficher le formulaire d'ajout de Mutuelle 
    afficher_formulaire_mutuelle: function (req, res) {
        modelMutuelle.afficher_formulaire_mutuelle(function (data) {
            res.render('./formulaire_mutuelle', { valid: req.flash('valid'), erreur: req.flash('erreur'), titre: "formulaire mutuelle" });
        });
    },
    //afficher une fiche individuelle sous formulairee de formulaire pour chaque Mutuelle, permettant également de modifier les données
    afficher_fiche_mutuelle: function (req, res) {
        let id = req.params.id;
        modelMutuelle.afficher_fiche_mutuelle(id, function (data) {
            res.render('./fiche_mutuelle', { valid: req.flash('valid'), erreur: req.flash('erreur'), contenu: data, titre: "Fiche mutuelle" })
        });
    },
    //éxécuter le formulaire d'ajout de Mutuelle
    executer_formulaire_mutuelle: function (req, res) {
        let Mutuelles_nom = req.body.inputNomMutu
        let Mutuelles_mail = req.body.inputEmail
        let Mutuelles_tel = req.body.inputTel
        if (Mutuelles_nom === "" || Mutuelles_mail === "" || Mutuelles_tel === "") {
            req.flash('erreur', 'Remplir tout les champs');
            res.redirect('./formulaire_mutuelle')
        } else {
            Mutuelles_tel = Mutuelles_tel.split(' ').join('')
            
            let mutuelleParam = { Mutuelles_nom, Mutuelles_tel, Mutuelles_mail }
            
            modelMutuelle.executer_formulaire_mutuelle(mutuelleParam, function (data) {
                req.flash('valid', 'Ajout de mutuelle terminé');
                res.redirect('./liste_mutuelles')
            })
        }
    },
    //éxécuter le formulaire de modification des données Mutuelle
    update_formulaire_mutuelle: function (req, res) {
        let id = req.params.id
        let Mutuelles_nom = req.body.inputNomMutu
        let Mutuelles_mail = req.body.inputEmail
        let Mutuelles_tel = req.body.inputTel
        if (Mutuelles_nom === "" || Mutuelles_mail === "" || Mutuelles_tel === "") {
            req.flash('erreur', 'Remplir tout les champs');
            res.redirect('./../fiche_mutuelle/' + id)
        } else {
            Mutuelles_tel = Mutuelles_tel.split(' ').join('')
            
            let mutuelleParam = { Mutuelles_nom, Mutuelles_tel, Mutuelles_mail }
            
            modelMutuelle.update_formulaire_mutuelle([mutuelleParam, id], function (data) {
                req.flash('valid', 'Modification de mutuelle terminé');
                res.redirect('./../liste_mutuelles')
            })
        }
    },
    //supprimer les données Mutuelle
    delete_fiche_mutuelle: function (req, res) {
        id = req.params.id
        modelMutuelle.delete_fiche_mutuelle(id, function (data) {
            req.flash('valid', 'Supression de mutuelle terminé');
            res.redirect('./../liste_mutuelles')
        });
    }
    
}