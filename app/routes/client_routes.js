var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var clientSchema = mongoose.Schema({
    mail: String,
    nom: String,
    prenom: String,
    dateNaissance: Date,
    mdp: String,
    adresse: String,
    isDelete: {type: Boolean, default: false}

});
module.exports = function(app, db) {
    var Client = mongoose.model('Client', clientSchema);
    var ObjectID = require('mongodb').ObjectID;

    // UPDATE METHOD

    app.put('/client/:id', function(req, res){
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        var client = new Client();
        client.mail = req.body.mail;
        client.nom = req.body.nom;
        client.prenom = req.body.prenom;
        client.dateNaissance = req.body.dateNaissance;
        client.mdp = req.body.mdp;
        client.adresse = req.body.adresse;


        Client.update(details,client, function (err,doc) {
            res.send("Client " + doc._id + " has been updated");
        });
    });

    // DELETE METHOD
    app.delete('/client/:id', function(req, res){
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        var client = new Client();

        Client.update(details,{isDelete: true}, function (err, doc){
            res.send("Client " + doc._id +" has been deleted");
        });
    });

    // GET METHOD
    app.get('/client/:id', function(req, res){
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        Client.findById(details, function (err, doc){
            if(doc.isDelete==true){
                res.send("This client has been deleted. You can't read his information");
            }else{
                res.send(doc);

            }
        });
    });


    // POST METHOD
    app.post('/client', function(req, res){
        // You'll create your note here.
        var client = new Client();
        client.mail = req.body.mail;
        client.nom = req.body.nom;
        client.prenom = req.body.prenom;
        client.dateNaissance = req.body.dateNaissance;
        client.mdp = req.body.mdp;
        client.adresse = req.body.adresse;


        client.save(function (err) {
            if (err) {
                res.send(err);

            }
            else {
                console.log("Client class saved");
                res.send(client);

            }
        });

    });

    //authentification :
    app.post('/client/register', function(req, res) {

        var hashedPassword = bcrypt.hashSync(req.body.password, 8);

        User.create({
                name : req.body.name,
                email : req.body.email,
                password : hashedPassword
            },
            function (err, user) {
                if (err) return res.status(500).send("There was a problem registering the user.")

                // create a token
                var token = jwt.sign({ id: user._id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });

                res.status(200).send({ auth: true, token: token });
            });
    });
    //get token
    app.get('/client/me', function(req, res) {

        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

            res.status(200).send(decoded);
        });
    });
};