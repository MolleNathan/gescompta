var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var produitSchema = mongoose.Schema({
    nom: String,
    prix: Number,
    description :{
        nom: String,
        categorie: String,
        marque: String,
        prixTTC: Number
    },
    infosTech : {
        capMemoire: String,
        frequenceRafraichissement: String,
        autonomie: String,
        compatibiliteOS: String,
        interface: String
    },
    infosCommerciales : {
        garantie: String,
        mailSAV : String,
        adresseRetour : String
    },
    isDelete: {type: Boolean, default: false}

});


module.exports = function(app, db) {
    var Produit = mongoose.model('Produit', produitSchema);
    var ObjectID = require('mongodb').ObjectID;

    // UPDATE METHOD

    app.put('/produit/:id', function(req, res){
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        var client = new Produit();
        client.mail = req.body.mail;
        client.nom = req.body.nom;
        client.prenom = req.body.prenom;
        client.dateNaissance = req.body.dateNaissance;
        client.mdp = req.body.mdp;
        client.adresse = req.body.adresse;


        Produit.update(details,client, function (err,doc) {
            res.send("Produit " + doc._id + " has been updated");
        });
    });

    // DELETE METHOD
    app.delete('/produit/:id', function(req, res){
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        Produit.remove(details,{isDelete: true}, function (err, doc){
            res.send("Produit " + doc._id +" has been deleted");
        });
    });

    // GET METHOD
    app.get('/produit/:id', function(req, res){
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        Produit.findById(details, function (err, doc){
            if(doc.isDelete==true){
                res.send("This product has been deleted. You can't read his information");
            }else{
                res.send(doc);

            }        });
    });



    // POST METHOD
    app.post('/produit', function(req, res){
        // You'll create your note here.
        console.log(req.body);

        var produit = new Produit();
        produit.prix = req.body.prix;
        produit.description.nom = req.body.description.nom;
        produit.description.categorie = req.body.description.categorie;
        produit.description.marque = req.body.description.marque;
        produit.description.prixTTC = req.body.description.prixTTC;
        produit.infosTech.capMemoire = req.body.infosTech.capMemoire;
        produit.infosTech.frequenceRafraichissement = req.body.infosTech.frequenceRafraichissement;
        produit.infosTech.autonomie = req.body.infosTech.autonomie;
        produit.infosTech.compatibiliteOS = req.body.infosTech.compatibiliteOS;
        produit.infosTech.interface = req.body.infosTech.interface;
        produit.infosCommerciales.garantie = req.body.infosCommerciales.garantie;
        produit.infosCommerciales.mailSAV = req.body.infosCommerciales.mailSAV;
        produit.infosCommerciales.adresseRetour = req.body.infosCommerciales.adresseRetour;

        produit.save(function (err) {
            if (err) {
                res.send(err);
            }
            else {
                console.log("Produit class saved");
            }
        });
        res.send(produit);

    });

};