//Model Accueil
const mysql2 = require('mysql2');
let iniparser = require('iniparser');

// activer les dépendances pour la bdd
let configDB = iniparser.parseSync('./DB.ini')
let mysqlconnexion = mysql2.createConnection({
    host:configDB['dev']['host'],
    user:configDB['dev']['user'],
    password:configDB['dev']['password'],
    database:configDB['dev']['database']
})

mysqlconnexion.connect((err) => {
    if (!err) console.log('BDD connectée. =====================================================================================')
    else console.log('BDD connexion échouée \n Erreur: '+JSON.stringify(err))
})

const quizz = {

    afficherQR () {

        let requete = "SELECT * FROM questions, reponses"
        mysqlconnexion.query(requete, (req, res) => {
            if (!err) {
                console.log(lignes);
                res.render("quizz", {quizz : lignes});
            }
        })
    }
};
    




module.exports = {
    quizz
};