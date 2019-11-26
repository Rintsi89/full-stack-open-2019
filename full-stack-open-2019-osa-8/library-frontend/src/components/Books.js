import React, {useState} from 'react'

const Books = ({ result, show }) => {
  
  const [filter, setFilter]  = useState('')
  const [message, setMessage] = useState('Showing books in genre: All genres')

  if (!show || result.loading) {
    return null
  }

  const books = result.data.allBooks

  const changeFilter = (genreName) => {
    setFilter(genreName)
    setMessage(`Showing books in genre: ${genreName}`)
  }

  const createGenres = () => {
    let genres = ['All genres']
    books.forEach(book => {
    book.genres.forEach(genre => {
      genres.push(genre)
    })
  })
  return genres = [...new Set(genres)]
}

const booksToShow = () => {

  if (!filter || filter === 'All genres') {
    return books
  }
  return books.filter(book => book.genres.includes(filter))
}
  return (
    <div>
      <h2>books</h2>
      {message}
      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow().map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {createGenres().map(genre => 
            <button key={genre} style={ {marginLeft: 5, marginTop: 5 } } onClick={() => changeFilter(genre)}>{genre}</button>
          )}
    </div>
  )
}

export default Books