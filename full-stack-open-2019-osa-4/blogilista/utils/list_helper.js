const _ = require('lodash')

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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}