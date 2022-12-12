const mysql = require('mysql')
const express = require('express');
const ejs = require('ejs');
const path     = require('path')  

const iniparser = require('iniparser')
const routeur = require('./routes/route.js');



// activer les dépendances pour Express et EJS
let app = express()
app.set('view engine', 'ejs')
app.use(express.static('views'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

app.set("views",path.resolve(__dirname,'views'))
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));


// activer le middleware et lancer l'application sur le port 3000
app.use(express.json())
app.listen(3000, () => console.log('le serveur Sauteuhz est prêt.'))

 // utiliser les routeurs
app.get('/', (req, res) => {
    res.send('Le serveur Pharmacie Sauteuhz est actif !')
})


//Afficher page accueil
.get('/accueil', function(req, res) {
    res.render('accueil')
    })


//Afficher vue dépôt ordonnance
.get('/addOrdonnance', function(req, res) {
    res.render('addOrdonnance')
    })

//Afficher vue ajout patient
.get('/addPatient', function(req, res) {
    res.render('addPatient')
    })

//Afficher vue ajout medicament au stock
.get('/addMedicament', function(req, res) {
    res.render('addMedicament')
    })

//Afficher vue consulter ordonnance
.get('/consultOrdonnance', function(req, res) {
    res.render('consultOrdonnance')
    })

//Afficher vue consulter la liste des patients
.get('/consultListePatient', function(req, res) {
    res.render('consultListePatient')
    })

//Afficher vue consulter les stocks
.get('/consultStock', function(req, res) {
    res.render('consultStock')
    }) 

app.use('/pharmacie_sauteuhz_test', routeur)