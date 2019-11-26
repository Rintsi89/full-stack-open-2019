const config = require('./utils/config')
const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

mongoose.set('useFindAndModify', false)

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`

  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    id: ID! 
    books: [Book!]
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
    recommendations: [Book!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }   
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {

      if (!args.genre && !args.author) {
        return Book.find({}).populate('author')
        
      }

      return Book.find({ genres : { $in: args.genre }}).populate('author')
      
      // const isSelectedGenre = !args.genre ? () => true : book => book.genres.includes(args.genre)
      // const isSelectedAuthor = !args.author ? () => true : book => book.author === args.author
      // return books.filter(isSelectedGenre).filter(isSelectedAuthor)
    },
    allAuthors: () => Author.find({}).populate("books"),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new AuthenticationError("Not authenticated!")
      }
  
      const author = await Author.findOne({ name: args.author })
      let authorId = author ? author._id : null

      if (!author) {
        const newAuthor = new Author({ name: args.author })
        await newAuthor.save()
        authorId = newAuthor._id
      } 

      let book = new Book({ ...args, author: authorId }) 

      try {
        await book.save()
        await Author.findByIdAndUpdate(authorId, { $push: { books: book._id } })
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      book = await Book.findById(book._id).populate('author')
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      console.log(book)
      return book
    },
    editAuthor: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new AuthenticationError("Not authenticated!")
      }
      
      let author = null
      const filter = { name: args.name  }
      const update = { born: args.setBornTo }

      try {
        author = await Author.findOneAndUpdate(filter, update)
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
  
      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, config.JWT_SECRET) }
    }  
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), config.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})