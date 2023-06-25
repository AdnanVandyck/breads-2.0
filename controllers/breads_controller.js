const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')


// CREATE
breads.post('/', (req, res) => {
    if (!req.body.image) {
      req.body.image = undefined
    }
    if(req.body.hasGluten === 'on') {
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread.create(req.body)
    res.redirect('/breads')
  })
  

// INDEX
breads.get('/', async(req,res) => {
        const foundBreads = await Bread.find() 
                res.render('index',
        {
            breads: foundBreads,
            title: 'Index Page'
        }) 


    // Bread.find()
    // .then(foundBreads => {
    //     res.render('index',
    //     {
    //         breads: foundBreads,
    //         title: 'Index Page'
    //     }) 
    // })
})



// NEW
breads.get('/new', (req, res) => {
    res.render('new')
})

// EDIT
breads.get('/:id/edit', (req, res) => {
    res.render('edit', {
      bread: Bread[req.params.id],
      index: req.params.indexArray
    })
})


// SHOW
breads.get('/:id', async(req, res) => {
try{const foundBread = await Bread.findById(req.params.id)
    res.render('show', {
        bread: foundBread
    })
} catch (error) {
    res.status(303).redirect('/breads')
    console.log(error)
}

})


// UPDATE
breads.put('/:arrayIndex', (req, res) => {
    console.log(req.body)
    // console.log(Bread[req.params.arrayIndex])
    if(req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    Bread[req.params.arrayIndex] = req.body
    res.redirect(`/breads/${req.params.arrayIndex}`)
})



// DELETE

breads.delete('/:id', async(req, res) => {
await Bread.findByIdAndDelete(req.params.id)
res.status(303).redirect('/breads') 
    
    })
// breads.delete('/:indexArray', (req, res) => {
//     Bread.splice(req.params.indexArray, 1)
//     res.status(303).redirect('/breads')
// })


module.exports = breads