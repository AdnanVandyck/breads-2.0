const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

breads.get('/data/seed', async(req, res) => {
    await Bread.insertMany(
    [
        {
          name: 'Rye',
          hasGluten: true,
          image: 'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        },
        {
          name: 'French',
          hasGluten: true,
          image: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        },
        {
          name: 'Gluten Free',
          hasGluten: false,
          image: 'https://images.unsplash.com/photo-1546538490-0fe0a8eba4e6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
        },
        {
          name: 'Pumpernickel',
          hasGluten: true,
          image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
        }
      ]
   )
        res.redirect('/breads')

      })

  


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
breads.get('/:id/edit', async(req, res) => {
    const bread = await Bread.findById(req.params.id)
    res.render('edit', {
      bread: bread
    //   index: req.params.indexArray
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
breads.put('/:id', async(req, res) => {
    console.log(req.body)
    // console.log(Bread[req.params.arrayIndex])
    if(req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    await Bread.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.redirect(`/breads/${req.params.id}`)
    // Bread[req.params.arrayIndex] = req.body
    // res.redirect(`/breads/${req.params.arrayIndex}`)
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