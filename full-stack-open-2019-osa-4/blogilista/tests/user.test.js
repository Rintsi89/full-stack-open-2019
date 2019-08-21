const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper_user')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

describe('Creation of user', () => {

    test('succeeds with valid user data', async () => {
        const user = helper.validUser

        await api
            .post('/api/users/')
            .send(user)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        
        expect(usersAtEnd.length).toBe(helper.initialUsers.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(
            'Rintsi89'
        )
    })

    test('fails with same user name', async () => {
        const user = helper.userWithSameUserName

        const result = await api
            .post('/api/users/')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(helper.initialUsers.length)
    })

    test('fails without user name', async () => {
        const user = helper.userWithNoUserName

        const result = await api
            .post('/api/users/')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Path `username` is required.')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(helper.initialUsers.length)
    })

    test('fails with too short user name', async () => {
        const user = helper.userWithShortUserName

        const result = await api
            .post('/api/users/')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Path `username` (`Ok`) is shorter than the minimum allowed length (3).')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(helper.initialUsers.length)
    })

    test('fails without password', async () => {
        const user = helper.userWithNoPassword

        const result = await api
            .post('/api/users/')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('Password is required and must be at least 3 characters!')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(helper.initialUsers.length)
    })

    test('fails with too short password', async () => {
        const user = helper.userWithShortPassword

        const result = await api
            .post('/api/users/')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Password is required and must be at least 3 characters!')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(helper.initialUsers.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})