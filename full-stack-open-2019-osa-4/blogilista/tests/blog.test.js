const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const _ = require('lodash')
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('dummy returns one', () => {
    const blogs = []

    const result = helper.dummy(blogs)
    expect(result).toBe(1)
})

describe('Total likes', () => {
   
    test('of empty array is zero', () => {
        const result = helper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog equals likes of that blog', () => {
        const result = helper.totalLikes(helper.listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger blog list is calculated right', () => {
        const result = helper.totalLikes(helper.initialBlogs)
        expect(result).toBe(36)
    })

})

describe('Most popular blog', () => {

    const mostPopularObject = _.pick(helper.initialBlogs[2], ["title", "author", "likes"])
    
    test(`is called ${JSON.stringify(helper.initialBlogs[2].title)}`, () => {
        const result = helper.favoriteBlog(helper.initialBlogs)
        expect(result).toEqual(mostPopularObject)
    })
})

describe('Most blogs', () => {

    const mostBlogsByAuthor = { author: "Robert C. Martin", blogs: 3 }
    
    test(`are written by ${JSON.stringify(mostBlogsByAuthor.author)}`, () => {
        const result = helper.mostBlogs(helper.initialBlogs)
        expect(result).toEqual(mostBlogsByAuthor)
    })
})

describe('Most likes', () => {

    const mostLikesByAuthor = { author: 'Edsger W. Dijkstra', likes: 17 }
    
    test(`are received by the blogs of ${JSON.stringify(mostLikesByAuthor.author)}`, () => {
        const result = helper.mostLikes(helper.initialBlogs)        
        expect(result).toEqual(mostLikesByAuthor)
    })
})

describe('HTTP tests', () => {

    test('GET /api/blogs returns correct array', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helper.initialBlogs.length)
    })

    test('GET /api/blogs returns array where id-field exists for every item', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach(blog => {
            expect(blog.id).toBeDefined()
        });
    })

    test('POST /api/blogs adds one blog with valid content', async () => {

        const newBlog = {
            title: "Parasta kesässä – Joensuun Marttakahvio",
            author: "Jenni Häyrinen",
            url: "http://liemessa.fi/2019/08/marttakahvio-joensuu/",
            likes: 2
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(blog => blog.title)
        expect(titles).toContain(
            'Parasta kesässä – Joensuun Marttakahvio'
        )
    })
    test('POST /api/blogs with no likes, return 0 likes', async () => {

        const newBlogNoLikes = {
            title: "Parasta kesässä – Joensuun Marttakahvio",
            author: "Jenni Häyrinen",
            url: "http://liemessa.fi/2019/08/marttakahvio-joensuu/",
        }

        await api
            .post('/api/blogs')
            .send(newBlogNoLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

        const addedBlog = blogsAtEnd.filter(blog => blog.title === newBlogNoLikes.title)
        expect(addedBlog[0].likes).toBe(0)
    })

    test('POST /api/blogs with no title or URL, returns 400', async () => {

        const newBlogNoTitleOrUrl = {
            author: "Jenni Häyrinen"
        }

        await api
            .post('/api/blogs')
            .send(newBlogNoTitleOrUrl)
            .expect(400)
    })

    test('PUT /api/blogs/:id updates blog if id is valid', async () => {

        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        const updatedBlog = {...blogToUpdate, likes: 14}

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.length).toBe(
            helper.initialBlogs.length
        )

        expect(blogsAtEnd[0]).toEqual(updatedBlog)
    })

    test('DELETE /api/blogs/:id deletes blog if id is valid', async () => {

        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.length).toBe(
            helper.initialBlogs.length - 1
        )

        const titles = blogsAtEnd.map(blog => blog.title)
        expect(titles).not.toContain(blogToDelete.title)
    })
})

afterAll(() => {
    mongoose.connection.close()
})