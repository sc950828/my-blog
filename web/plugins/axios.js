export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    config.headers.Authorization =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNDcwZTJlMTgwNTUxODY4MDAxYTJlZCIsIm5hbWUiOiJyYW5keSIsImlzX2FkbWluIjpmYWxzZSwiaWF0IjoxNjE1MjcxMjYzfQ.KMTstekLZudT3RBxMxVZekuMRlM7Z0v6uJrvoqzKMJA'
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
