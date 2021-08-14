const express = require('express')
const router = express.Router()
// const app = express();

const signUpTemplateSchema = require('../models/signUpModels.js')

// app.post('/signup', (req, res, next) => {
router.post('/signup', (req, res) => {

    const signUpUser = new signUpTemplateSchema({
        
        fullName: req.body.fullName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
        /*
       ...request.body
       */
    })
    signUpUser.save()
    .then(data => {
        res.status(201).json(data)
    })
    .catch(error => {
        res.status(400).json(error)
    })
})

module.exports = router;