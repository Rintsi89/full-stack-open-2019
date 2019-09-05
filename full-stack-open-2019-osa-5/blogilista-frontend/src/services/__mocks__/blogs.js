const blogs = [
  {
    title: 'Paavon tekemä blogi',
    author: 'Paavo Pesusieni',
    url: 'www.google.fi',
    user: [{
      username: 'Paavo',
      name: 'Paavo Pesusieni',
      id: '5d5d713d0e353b17ec5c8350'
    }],
    likes: 2,
    id: '5d65158e74573f579c663c6e'
  },
  {
    title: 'Kuudes blogi',
    author: 'Jee',
    url: 'www.google.fi',
    user: [{
      username: 'Paavo',
      name: 'Paavo Pesusieni',
      id: '5d5d713d0e353b17ec5c8350'
    }],
    likes: 0,
    id: '5d6515b974573f579c663c6f'
  }
]

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }