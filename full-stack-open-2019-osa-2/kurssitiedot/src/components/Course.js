import React from 'react'

const Header = ({ name }) =>
    <h1>{name}</h1>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => {

    const createPartsArray = () => parts.map(part => <Part key={part.id} part={part} />)

    return (
        <div>
            {createPartsArray()}
        </div>
    )
}

const Total = ({ parts }) => {

    const totalExercies = parts.map(part => part.exercises).reduce((a, b) => a + b)

    return (
        <div>
            <p><strong>Number of exercises {totalExercies}</strong></p>
        </div>
    )
}

const Course = ({ course }) => {

    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course 