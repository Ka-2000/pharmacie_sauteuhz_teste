var modelClient = require('../models/ModelPatients');
module.exports = {
    //afficher la liste des clients avec leurs données
    afficher_liste_clients: function (req, res) {
        modelClient.afficher_liste_clients(function (data) {
            res.render('./liste_clients', { contenu: data, titre: "Liste des clients", valid: req.flash('valid'), erreur: req.flash('erreur') });
        });
    },
    //afficher le formulaire d'ajout de clients en recupérant les données invariables (les mutuelles)
    afficher_formulaire_client: function (req, res) {
        modelClient.afficher_formulaire_client(function (data) {
            res.render('./formulaire_client', { contenu: data, titre: "formulaire client", valid: req.flash('valid'), erreur: req.flash('erreur') })
        });
    },
    //afficher une fiche individuelle sous formulairee de formulaire pour chaque client, permettant également de modifier les données
    afficher_fiche_client: function (req, res) {
        let id = req.params.id;
        modelClient.afficher_fiche_client(id, function (data, data2) {
            res.render('./fiche_client', { info_client: data, contenu: data2, titre: "Fiche client", valid: req.flash('valid'), erreur: req.flash('erreur') })
        });
    },
    //éxécuter le formulaire d'ajout de clients
    executer_formulaire_client: function (req, res) {
        let clients_nom = req.body.inputNom
        let clients_prenom = req.body.inputPrenom
        let clients_mail = req.body.inputEmail
        let clients_tel = req.body.inputTel
        let clients_sexe = req.body.selectSexe
        let clients_dateNaissance = req.body.inputDate
        let clients_adresse = req.body.inputAdresse
        let clients_ville = req.body.inputVille
        let clients_cp = req.body.inputCp
        let clients_noSS = req.body.inputSS
        let idMutuelle = req.body.selectMutuelle
        if (clients_nom === "" || clients_prenom === "" || clients_mail === "" || clients_tel === "" || clients_sexe === "" || clients_dateNaissance === "" || clients_adresse === "" || clients_ville === "" || clients_cp === "" || clients_noSS === "" || idMutuelle === "") {
            req.flash('erreur', 'Remplir tout les champs');
            res.redirect('./formulaire_client')
        } else {
            //reverse la date de naissance pour la mettre au formulaireat mysql
            clients_dateNaissance = clients_dateNaissance.split("/").reverse().join("/");
            clients_tel = clients_tel.split(' ').join('')
            clients_noSS = clients_noSS.split(' ').join('')
            
            let clientParam = { idMutuelle, clients_noSS, clients_nom, clients_prenom, clients_sexe, clients_dateNaissance, clients_tel, clients_mail, clients_adresse, clients_ville, clients_cp }
            modelClient.executer_formulaire_client(clientParam, function (data) {
                req.flash('valid', 'Ajout de client terminé');
                res.redirect('./liste_clients')
            })
        }
    },
    //éxécuter le formulaire de modification des données clients
    update_formulaire_client: function (req, res) {
        let id = req.params.id
        
        let clients_nom = req.body.inputNom
        let clients_prenom = req.body.inputPrenom
        let clients_mail = req.body.inputEmail
        let clients_tel = req.body.inputTel
        let clients_sexe = req.body.selectSexe
        let clients_dateNaissance = req.body.inputDate
        let clients_adresse = req.body.inputAdresse
        let clients_ville = req.body.inputVille
        let clients_cp = req.body.inputCp
        let clients_noSS = req.body.inputSS
        let idMutuelle = req.body.selectMutuelle
        
        if (clients_nom === "" || clients_prenom === "" || clients_mail === "" || clients_tel === "" || clients_sexe === "" || clients_dateNaissance === "" || clients_adresse === "" || clients_ville === "" || clients_cp === "" || clients_noSS === "" || idMutuelle === "") {
            req.flash('erreur', 'Remplir tout les champs');
            res.redirect('./../fiche_client/' + id)
        } else {
            //reverse la date de naissance pour la mettre au formulaireat mysql
            clients_dateNaissance = clients_dateNaissance.split("/").reverse().join("/");
            clients_tel = clients_tel.split(' ').join('')
            clients_noSS = clients_noSS.split(' ').join('')
            
            let clientParam = { idMutuelle, clients_noSS, clients_nom, clients_prenom, clients_sexe, clients_dateNaissance, clients_tel, clients_mail, clients_adresse, clients_ville, clients_cp }
            
            modelClient.update_formulaire_client([clientParam, id], function (data) {
                req.flash('valid', 'Modification terminé');
                res.redirect('./../liste_clients')
            })
        }
    },
    //supprimer les données clients 
    delete_fiche_client: function (req, res) {
        id = req.params.id
        modelClient.delete_fiche_client(id, function (data) {
            req.flash('valid', 'Suppression du client terminé');
            res.redirect('./../liste_clients')
        });
    }
}