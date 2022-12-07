
const routeur = require('./routes/route.js');
const express = require('express');
const ejs = require('ejs');
const path     = require('path')  


// activer les dépendances pour Express et EJS
let app = express()
app.set('view engine', 'ejs')
app.use(express.static('views'))
app.use(express.static('public'))

app.set("views",path.resolve(__dirname,'views'))
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));


// activer le middleware et lancer l'application sur le port 3000
app.use(express.json())
app.listen(3000, () => console.log('le serveur Sauteuhz est prêt.'))

// utiliser les routeurs
app.get('/', (req, res) => {
    res.send('Sauteuhz est actif')
})

//Afficher page accueil
.get('/accueil', function(req, res) {
    res.render('accueil')
    })

//Afficher vue Quizz
.get('/quizz', function(req, res) {
    res.render('quizz')
    })


.get('/jeu', function(req, res) {
    res.render('jeu')
    })


.get('/infos', function(req, res) {
    res.render('infos')
    })

