import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    published
    author {
      name
    }
    genres
    }
`

const ALL_AUTHORS = gql`
{
  allAuthors  {
    name
    born
    books {
      title
      published
    }
  }
}
`

const ME = gql`
{
  me  {
    username
    favoriteGenre
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`
const BOOKS_BY_GENRE = gql`
query findBooksByGenre($genreToSearch: String!) {
  allBooks(genre: $genreToSearch) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`
const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]) {
  addBook(
    title: $title,
    author: $author
    published: $published,
    genres: $genres
  ) {
    ...BookDetails
  }
}
${BOOK_DETAILS}  
`
const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(name: $name, setBornTo: $born)  {
    name
    born
    bookCount
  }
}
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
const BOOK_ADDED = gql `
  subscription {
    bookAdded {
      id
      title
      published
      author {
        name
      }
      genres
    }
  }
`

const App = () => {

  const client = useApolloClient()
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [favoriteBooks, setFavoriteBooks] = useState([])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(book => book.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      
      alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    setToken(token)
  }, [])

  const getBooksByGenre = async () => {
    const userData = await client.query({ query: ME })
    const books = await client.query({
      query: BOOKS_BY_GENRE,
      variables: { genreToSearch: userData.data.me.favoriteGenre }
    })
    setUser(userData.data.me)
    setFavoriteBooks(books.data.allBooks)
    setPage('recommendations')
  }
  
  const handleError = (error) => {
    const message = error.graphQLErrors[0] ? error.graphQLErrors[0].message : "Something went wrong dude"
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const errorNotification = () => errorMessage &&
  <div style={{ color: 'red' }}>
    {errorMessage}
  </div>

  const result = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)
  
  const [addBook] = useMutation(CREATE_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }],
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    }
  })

  const [editAuthor] = useMutation(EDIT_AUTHOR,  {
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { !token ?
          <button onClick={() => setPage('login')}>login</button> :
          <>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => getBooksByGenre()}>recommendations</button>
          <button onClick={() => {logout()}}>log out</button>
          </>
        }
      </div>
      {errorNotification()}
      <Authors
        show={page === 'authors'}
        result={result}
        editAuthor={editAuthor}
        token={token}
      />

      <Books
        show={page === 'books'}
        result={resultBooks}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

      <Recommendations
        show={page === 'recommendations'}
        books={favoriteBooks}
        user={user}
      />

      <LoginForm
        show={page === 'login'}
        login={login}
        setToken={(token) => setToken(token)}
      />

    </div>
  )
}

export default App