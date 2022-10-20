const express = require('express')
const bodyParser = require('body-parser')
const port = 3000
const date = require(__dirname + '/date.js')

const app = express()


// create collection
const items = ["Buy food", "Cook food"]
const workItems = []

// setup view engine to ejs
app.set('view engine', 'ejs')

// body parser
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))


// render is the view engine
app.get('/', (req, res) => {
    const currentDay = date.getDate()

    res.render('list', {listTitle: currentDay, newListItem: items})
})

// parse the data input 
app.post('/', (req, res) => {
    const item = req.body.newList
    console.log(req.body)

    if(req.body.list === "Work List") {
        workItems.push(item)
        res.redirect('/work')
    } else {
        items.push(item)
        res.redirect('/')
    }

    // when we add more res.render
    // newListItem will be not defined

    // res.render('list', {newListItem: newList})
    // if u try to render a list we have to provide both constiables that we want to render
    // res.render('list', {kindOfDay: day,
    //     newListItem: item})

    // n the solution use res.redirect
    // res.redirect('/')
})

app.get('/work', (req, res) => {

    // workItems 
    res.render('list', {listTitle: 'Work List', newListItem: workItems})
})

// app.post('/work', (req, res) => {

//     // push into workItems array
//     const item = req.body.newList
//     workItems.push(item)
//     req.redirect('/work')
// })

app.get('/about', (req,res) => {
    res.render('about')
})


app.listen(port, () =>{
    console.log(`Running on port ${port}`);
})