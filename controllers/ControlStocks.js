var modelStock = require('../models/ModelStock');
module.exports = {
    //afficher la liste des Stocks avec leurs données
    afficher_liste_stocks: function (req, res) {
        modelStock.afficher_liste_stocks(function (data, data2, data3) {
            
            
            lesStock = []
            for (i in data2) {
                lesStock.push([data2[i].idMedicament, data2[i].Medicaments_libelle, data2[i].Medicaments_qte, data2[i].stock_necessaire])
            }
            
            for (i in data3) {
                lesStock.push([data3[i].Medicaments_id, data3[i].Medicaments_libelle, data3[i].Medicaments_qte, 0])
            }
            
            for (i in data) {
                lesStock[i][3] = lesStock[i][3] + data[i].stock_necessaire
            }
            res.render('./liste_stocks', { valid: req.flash('valid'), erreur: req.flash('erreur'), lesStock, contenu: data, contenud: data2, titre: "Les stocks" })
        });
    },
    //afficher le formulaire d'ajout de Stocks
    afficher_formulaire_stock: function (req, res) {
        modelStock.afficher_formulaire_stock(function (data) {
            res.render('./formulaire_stock', { valid: req.flash('valid'), erreur: req.flash('erreur'), titre: "formulaire stock" })
        });
    },
    //afficher une fiche individuelle sous formulairee de formulaire pour chaque Stock, permettant également de modifier les données
    afficher_fiche_stock: function (req, res) {
        let id = req.params.id;
        modelStock.afficher_fiche_stock(id, function (data) {
            res.render('./fiche_stock', { valid: req.flash('valid'), erreur: req.flash('erreur'), contenu: data, titre: "Fiche stock" })
        });
    },
    //éxécuter le formulaire d'ajout de Stocks
    executer_formulaire_stock: function (req, res) {
        let Medicaments_libelle = req.body.inputMed
        let Medicaments_qte = req.body.inputQte
        if (Medicaments_libelle === "" || Medicaments_qte === "") {
            req.flash('erreur', 'Remplir tout les champs');
            res.redirect('/formulaire_stock')
        } else {
            modelStock.executer_formulaire_stock([Medicaments_libelle, Medicaments_qte], function (data) {
                req.flash('valid', 'Ajout de stock terminé');
                res.redirect('./liste_stocks')
            })
        }
    },
    //éxécuter le formulaire de modification des données Stocks
    update_formulaire_stock: function (req, res) {
        let id = req.params.id
        let Medicaments_libelle = req.body.inputMed
        let Medicaments_qte = req.body.inputQte
        if (Medicaments_libelle === "" || Medicaments_qte === "") {
            req.flash('erreur', 'Remplir tout les champs');
            res.redirect('./../fiche_stock/' + id)
        } else {
            modelStock.update_formulaire_stock([Medicaments_libelle, Medicaments_qte, id], function (data) {
                req.flash('valid', 'Modification de stock terminé');
                res.redirect('./../liste_stocks')
            })
        }
    },
    //supprimer les données Stocks 
    delete_fiche_stock: function (req, res) {
        id = req.params.id
        modelStock.delete_fiche_stock(id, function (data) {
            req.flash('valid', 'Supression de stock terminé');
            res.redirect('./../liste_stocks')
        });
    }
}