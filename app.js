const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');

const app = express();

// cour - name of database
mongoose.connect('mongodb+srv://chicoumbetov:skypefacebook@cluster0.sb2y0.mongodb.net/cour?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// middleware with CORS pour que front 4200 et back 3000 puissent communiquer entre eux.
app.use((req, res, next) => {
    // ces headers permettent: 

    // d'accéder à notre API depuis n'importe quelle origine ( '*' 
    res.setHeader('Access-Control-Allow-Origin', '*');

    // d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');

    // d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// extraire l'objet JSON de la demande
// transformer le core de la requests en objet js utilisable
app.use(bodyParser.json());

app.use('/api/stuff', stuffRoutes);

module.exports = app;
