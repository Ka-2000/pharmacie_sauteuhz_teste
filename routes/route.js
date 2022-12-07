//création du routeur Express pour ce module
const express = require('express');
const routeur = express.Router();
const sexinfoControle = require('../controllers/controllerAccueil.js');

// voir tous les messages
routeur.get('/accueil', sexinfoControle.sexinfo_accueil)
routeur.get('/accueiljeu', sexinfoControle.sexinfo_accueiljeu)
routeur.get('/quizz', sexinfoControle.sexinfo_quizz)
routeur.get('/jeu', sexinfoControle.sexinfo_jeu)
routeur.get('/infos', sexinfoControle.sexinfo_infos)
module.exports = routeur;