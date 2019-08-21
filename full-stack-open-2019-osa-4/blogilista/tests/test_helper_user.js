const User = require('../models/user')

const initialUsers = [{
    username: "Käyttäjä-1",
    name: "Käyttäjä",
    password: "salasana"
}]

const validUser = {
    username: "Rintsi89",
    name: "Ville Rintala",
    password: "salainensalasana"
}

const userWithSameUserName = {
    username: "Käyttäjä-1",
    name: "Tuntematon",
    password: "salasana"
}

const userWithNoUserName = {
    username: "",
    name: "Tuntematon",
    password: "salasana"
}
const userWithShortUserName = {
    username: "Ok",
    name: "Tuntematon",
    password: "salasana"
}
const userWithNoPassword = {
    username: "Käyttäjä-2",
    name: "Tuntematon",
    password: ""
}

const userWithShortPassword = {
    username: "Käyttäjä-3",
    name: "Tuntematon",
    password: "Ok"
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    validUser,
    usersInDb,
    initialUsers,
    userWithSameUserName,
    userWithNoUserName,
    userWithNoPassword,
    userWithShortUserName,
    userWithShortPassword
}