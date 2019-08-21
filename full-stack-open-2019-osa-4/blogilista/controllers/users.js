const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate("blogs", {url: 1, title: 1, author: 1, id: 1})
    response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
    if (request.body.password === undefined || request.body.password.length < 3 ) {
        return response.status(400).json({ error: 'Password is required and must be at least 3 characters!' })
    }

    try {
    
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(request.body.password, saltRounds)

        const user = new User({
            username: request.body.username,
            name: request.body.name,
            passwordHash,
        })

        const savedUser = await user.save()

        response.json(savedUser)
    } catch (exception) {
        next(exception)
    }
})

module.exports = usersRouter