const Thing = require('../models/thing');

exports.createThing = (req, res, next) => {
    // en ayant supprimé en amont le faux_id envoyé par le front-end
    delete req.body._id;  
    // créez une instance de votre modèle Thing 
    // en lui passant un objet JavaScript contenant toutes les 
    // informations requises du corps de requête analysé
    const thing = new Thing({
      ...req.body
    });
    // title: req.body.title,
    // description: req.body.description,
    // imageUrl: req.body.imageUrl,
    // price: req.body.price,
    // userId: req.body.userId
    // save copied info to data base
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  }

exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  }

exports.modifyThing = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  }

exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.getAllStuff = (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
}