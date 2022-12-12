var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '',  
    database: 'bdd_sauteuhz' 
});
conn.connect(function (err) {
    if (err) throw err;
    console.log('-----------------------------------Connexion à la base de donnée réussis !-----------------------------------');
});
module.exports = conn;