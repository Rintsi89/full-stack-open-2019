import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showMessage } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    
    const voteAnecdote = (anecdote) => {
        const votedAnecdote =  { ...anecdote, votes: anecdote.votes + 1 }
        props.vote(anecdote.id, votedAnecdote)
        props.showMessage(`You voted ${anecdote.content} !`, 5000)
    }

    return (
      <div>
            {props.visibleAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes} votes 
                    <button onClick={() => voteAnecdote(anecdote)}>Vote</button>
                </div>
            </div>
        )}
      </div>
    )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
    
    if (filter === []) {
        return anecdotes
    }
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
}

const mapStateToProps = (state) => {
    return {
        visibleAnecdotes: anecdotesToShow(state),
    }
}

const mapDispatchToProps = {
    vote,
    showMessage
}

const ConnectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
    )(AnecdoteList)

export default ConnectedAnecdotes