var db = require('../connexion/loading');

module.exports= {
    //afficher la liste des Pathologies avec leurs données
    afficher_liste_pathologie:function(callback){
        var sql ='SELECT * FROM Pathologies';
        db.query(sql, function(err,data,fields){
            if (err)throw err;
            return callback(data);
        });
    },
    //afficher le formulaire d'ajout de Pathologies 
    afficher_form_pathologie: function(callback){
        return callback();
    },
    //afficher une fiche individuelle sous forme de formulaire pour chaque Ordonnance, permettant également de modifier les données
    afficher_fiche_pathologie: function(myID, callback){
        var sql = 'SELECT * FROM Pathologies WHERE Pathologies_id = ?' ;
        db.query(sql, myID, function(err,data,fields){
            if(err)throw err;
            return callback(data);
        });
    },
    // éxécuter le formulaire d'ajout de Pathologies
    executer_form_pathologie: function(Pathologies_libelle, callback){
        var sql= 'INSERT INTO Pathologies SET ? ' ;
        db.query(sql,Pathologies_libelle, function(err, data){
            if(err)throw err;
            return callback(data);
        });
    },
    //éxécuter le formulaire de modification des données Pathologies
    update_form_pathologie: function(Pathologies_libelle,myID, callback){
        var sql = 'UPDATE Pathologies SET ? WHERE Pathologies_id = ?' ;
        db.query(sql, Pathologies_libelle, myID, function(err, data,fields){
            if(err)throw err;
            return callback(data);
        });
    },
    //supprimer les données Pathologies 
    delete_fiche_pathologie: function(myID, callback){
        var sql = 'DELETE FROM Pathologies WHERE Pathologies_id = ?'
        db.query(sql, myID, function(err,data,fields){
            if(err)throw err;
            return callback(data);
        });
    }
}