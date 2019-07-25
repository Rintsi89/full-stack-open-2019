import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdotes = ({ anecdote, vote }) => (
    <div>
        <p>{anecdote}</p>
        <p>Has {vote} votes</p>
    </div>
)

const Button = ({ actionFunction, text }) => (
    <button onClick={actionFunction}>
        {text}
    </button>
)

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
    ]
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
    const highestPoint = Math.max.apply(null, points)
    const indexOfHighest = points.indexOf(highestPoint)
    
    const createRandom = () => {
        const randomNumber = Math.floor(Math.random() * (anecdotes.length))
        setSelected(randomNumber)
    }
    const voteAnecdote = () => {
        const arrayCopy = [...points]
        arrayCopy[selected] += 1
        setPoints(arrayCopy)
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <Anecdotes anecdote={anecdotes[selected]} vote={points[selected]}/>
            <Button actionFunction={voteAnecdote} text="Vote"/>
            <Button actionFunction={createRandom} text="Next anecdote"/>
            <h1>Anecdote with most votes</h1>
            <Anecdotes anecdote={anecdotes[indexOfHighest]} vote={points[indexOfHighest]} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)