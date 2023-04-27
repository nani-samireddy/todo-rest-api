const express = require('express')
const app = express()
const db = require('./db')
const routes = require('./routes')

// session
const session = require('express-session')
app.use(session({
    secret: 'webslesson',
    resave: true,
    saveUninitialized: true
}))


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// welcome route
app.get('/', (req, res) => {
    res.send({ 'title': 'Welcome to Todo APP API', session: req.session })
})
// routes
app.use('/api', routes)

// server
app.listen(3000, () => {
    console.log('Server is up on port 3000')

})