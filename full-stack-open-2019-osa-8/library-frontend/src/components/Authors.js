import React, { useState } from 'react'
import Select from 'react-select'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  
  if (!props.show || props.result.loading) {
    return null
  }

  const authors = props.result.data.allAuthors

  const options = () => {
    const optionsArray = []
    authors.forEach(author => {
      const authorToMap = {'value': author.name, 'label': author.name } 
      optionsArray.push(authorToMap)
  }) 
    return optionsArray
 }

  const submit = async (e) => {
    e.preventDefault()

    await props.editAuthor({
      variables: { name, born: Number(born) }
    })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.books.length}</td>
            </tr>
          )}
        </tbody>
      </table>
      {props.token ?
      <>
      <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <div>
            name
            <Select options={options()} onChange={(e) => setName(e.value)}/>
          </div>
          <div>
            born
            <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
        <button type='submit'>Update year</button>
      </form>
      </> 
          :
      <>
      </> 
    }
     
      

    </div>
  )
}

export default Authors