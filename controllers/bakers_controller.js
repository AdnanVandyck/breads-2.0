// dependencies
const express = require('express')
const baker = express.Router()
const Baker = require('../models/baker.js')
const bakerSeedData = require('../models/baker_seed.js')


baker.get('/data/seed', async(req, res) => {
    await Baker.insertMany(bakerSeedData)
    res.redirect('/breads')
})

// INDEX
baker.get('/', async(req,res) => {
    const foundBakers = await Baker.find().populate('breads')
    res.send(foundBakers)


        //         res.render('index',
        // {
        //     breads: foundBreads,
        //     title: 'Index Page',
            
        // }) 
    })
// export
module.exports = baker                    

