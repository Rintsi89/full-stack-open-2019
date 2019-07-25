import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = (props) => {
    
    if(props.total === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }

    return (
        <div>
            <table>
                <tbody>
                    <Statistic text="Good" value={props.good} />
                    <Statistic text="Neutral" value={props.neutral} />
                    <Statistic text="Bad" value={props.bad} />
                    <Statistic text="Total" value={props.total} />
                    <Statistic text="Average" value={props.average} />
                    <Statistic text="Positive" value={props.positive} />
                </tbody>
            </table>
        </div>
    )
}

const Statistic = ({ text, value }) => (
        <tr>
            <td>{text}</td> 
            <td>{value}</td>
        </tr>
)

const App = () => {
    
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const total = good + neutral + bad
    const average = ((good * 1 + neutral * 0 + bad * -1) / total).toFixed(2)
    const positive = (good / total * 100).toFixed(2) + "%"

    const handleGoodClick = () => {
        setGood(good + 1)
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
    }

    const handleBadClick = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <h1>Give Feedback</h1>
            <Button handleClick={handleGoodClick} text="Good"/>
            <Button handleClick={handleNeutralClick} text="Neutral"/>
            <Button handleClick={handleBadClick} text="Bad"/>
            <h1>Statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)