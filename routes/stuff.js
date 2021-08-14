const express = require('express');

const router = express.Router();

const Thing = require('../models/thing');

// gérer la demande POST provenant de l'application front-end
// receive object with data from frontend
// post using from mongo db
router.post('/', (req, res, next) => {
    // en ayant supprimé en amont le faux_id envoyé par le front-end
    delete req.body._id;  
    // créez une instance de votre modèle Thing 
    // en lui passant un objet JavaScript contenant toutes les 
    // informations requises du corps de requête analysé
    const thing = new Thing({
      ...req.body
    });
    // save copied info to data base
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });
  
  
  
  // middleware avec un groupe d'articles 
  // avec le schéma de données spécifique requis par le front-
  
  router.put('/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });
  
  router.delete('/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });
  
  // nous utilisons la méthode get() pour répondre uniquement aux demandes GET à cet endpoint
  router.use('/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  });
  
  router.get('/', (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
  });


module.exports = router;