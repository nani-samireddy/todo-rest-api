const express = require('express')
const router = express.Router()
const db = require('./db')
const uuid = require('uuid');


router.post('/create-user', (req, res) => {
    const { name, email, password } = req.body
    const userId = uuid.v4().slice(0, 20);
    db.query('INSERT INTO users SET ?', { userId, name, email, password }, (err, result) => {
        if (err)
            res.sendStatus(500)
        res.send(result)
        return;

    })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, result) => {
        if (err)
            res.sendStatus(500)
        if (result.length > 0) {
            req.session.userId = result[0].userId
            res.send({ loggedIn: true, user: result[0] })
        }
        else {
            res.send({ loggedIn: false, message: 'invalid email/password' })
        }
    })
    return;

})

router.get('/logout', (req, res) => {
    if (req.session.userId) {
        req.session.destroy()
        res.send({ loggedIn: false, message: 'logged out' })
    }
    else {
        res.send({ loggedIn: false, message: 'please login' })
    }
    return;

})




router.get('/get-all-todos', (req, res) => {
    if (!req.session.userId) {
        res.send({ loggedIn: false, message: 'please login' })
    }
    db.query('SELECT * FROM todos', (err, result) => {
        if (err)
            res.sendStatus(500)
        res.send(result)
        return;

    })
})

router.get('/get-todo/:todoId', (req, res) => {
    if (!req.session.userId) {
        res.send({ loggedIn: false, message: 'please login' })
    }
    const { todoId } = req.params
    db.query('SELECT * FROM todos WHERE todoId = ?', todoId, (err, result) => {
        if (err)


            res.sendStatus(500)
        res.send(result)
        return;
    })
})

router.post('/create-todo', (req, res) => {
    if (!req.session.userId) {
        res.send({ loggedIn: false, message: 'please login' })
    }
    const { title, description, status } = req.body
    const todoId = uuid.v4().slice(0, 20);
    db.query('INSERT INTO todos SET ?', { todoId, title, description, status }, (err, result) => {
        if (err)
            res.sendStatus(500)

        res.send(result)
        return;

    })
})

router.put('/update-todo/:todoId', (req, res) => {
    if (!req.session.userId) {
        res.send({ loggedIn: false, message: 'please login' })
    }
    const { todoId } = req.params
    const { title, description, status } = req.body
    db.query('UPDATE todos SET title = ?, description = ?, status = ? WHERE todoId = ?', [title, description, status, todoId], (err, result) => {
        if (err)
            res.sendStatus(500)
        res.send(result)
        return;

    })
})

router.delete('/delete-todo/:todoId', (req, res) => {
    if (!req.session.userId) {
        res.send({ loggedIn: false, message: 'please login' })
    }
    const { todoId } = req.params
    db.query('DELETE FROM todos WHERE todoId = ?', todoId, (err, result) => {
        if (err)
            res.sendStatus(500)
        res.send(result)
        return;
    })
})




module.exports = router


