const express = require('express');

const router = express.Router();

const stuffCtrl = require('../controllers/stuff');



// gérer la demande POST provenant de l'application front-end
// receive object with data from frontend
// post using from mongo db
router.post('/', stuffCtrl.createThing);
  
  // middleware avec un groupe d'articles 
  // avec le schéma de données spécifique requis par le front-
  
  router.put('/:id', stuffCtrl.modifyThing);
  
  router.delete('/:id', stuffCtrl.deleteThing);
  
  // nous utilisons la méthode get() pour répondre uniquement aux demandes GET à cet endpoint
  router.use('/:id', stuffCtrl.getOneThing);
  
  router.get('/', stuffCtrl.getAllStuff);


module.exports = router;