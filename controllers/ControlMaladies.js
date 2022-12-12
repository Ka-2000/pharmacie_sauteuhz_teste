var modelPathologie = require('../models/ModelMaladies');
module.exports = {
    //afficher la liste des Pathologies avec leurs données
    afficher_liste_pathologies: function (req, res) {
        modelPathologie.afficher_liste_pathologies(function (data) {
            res.render('./liste_pathologies', { valid: req.flash('valid'), erreur: req.flash('erreur'), contenu: data, titre: "Les pathologies" })
        });
    },
    //afficher le formulaire d'ajout de Pathologies
    afficher_formulaire_pathologie: function (req, res) {
        modelPathologie.afficher_formulaire_pathologie(function (data) {
            res.render('./formulaire_pathologie', { valid: req.flash('valid'), erreur: req.flash('erreur'), contenu: data, titre: "formulaire pathologie" })
        });
    },
    //afficher une fiche individuelle sous formulairee de formulaire pour chaque Ordonnance, permettant également de modifier les données    
    afficher_fiche_pathologie: function (req, res) {
        let id = req.params.id;
        modelPathologie.afficher_fiche_pathologie(id, function (data) {
            res.render('./fiche_pathologie', { valid: req.flash('valid'), erreur: req.flash('erreur'), contenu: data, titre: "Fiche pathologie" })
        });
    },
    //éxécuter le formulaire d'ajout de Pathologies
    executer_formulaire_pathologie: function (req, res) {
        let Pathologies_libelle = req.body.inputNomMutu
        if (Pathologies_libelle === "") {
            req.flash('erreur', 'Remplir tout les champs');
            res.redirect('./formulaire_pathologie')
        } else {
            pathoLib = { Pathologies_libelle }
            modelPathologie.executer_formulaire_pathologie(pathoLib, function (data) {
                req.flash('valid', 'Ajout de pathologie terminé');
                res.redirect('./liste_pathologies')
            })
        }
    },
    //éxécuter le formulaire de modification des données Pathologies
    update_formulaire_pathologie: function (req, res) {
        let id = req.params.id
        let Pathologies_libelle = req.body.inputNomMutu
        let pathoLib = { Pathologies_libelle }
        if (Pathologies_libelle === "") {
            req.flash('erreur', 'Remplir tout les champs');
            res.redirect('./../fiche_pathologie/' + id)
        } else {
            modelPathologie.update_formulaire_pathologie([pathoLib, id], function (data) {
                req.flash('valid', 'Modification de pathologie terminé');
                res.redirect('./../liste_pathologies')
            })
        }
    },
    //supprimer les données Pathologies 
    delete_fiche_pathologie: function (req, res) {
        id = req.params.id
        modelPathologie.delete_fiche_pathologie(id, function (data) {
            req.flash('valid', 'Supression de pathologie terminé');
            res.redirect('./../liste_pathologies')
        });
    }
}