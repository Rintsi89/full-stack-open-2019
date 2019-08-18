const _ = require('lodash')
const Blog = require('../models/blog')

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
    }

    const mappedLikes = blogs.map(blog => blog.likes)

    return mappedLikes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    }

    const mostPopularBlog = blogs.reduce(reducer)
    return _.pick(mostPopularBlog, ["title", "author", "likes"])
}

const mostBlogs = (blogs) => {
    const mappedBlogs = _(blogs).groupBy("author").map((objs, key) => ({
                "author": key,
                "blogs": _.countBy(objs, "author")[key],
            })).value();

    return mostBlogsByAuthor = _(mappedBlogs).maxBy("blogs") 
}
const mostLikes = (blogs) => {
    
    const mappedBlogs = _(blogs).groupBy("author").map((objs, key) => ({
                "author": key,
                "likes": _.sumBy(objs, "likes"),
            })).value();

    return mostLikesByAuthor = _(mappedBlogs).maxBy("likes") 
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    initialBlogs,
    listWithOneBlog,
    blogsInDb
}