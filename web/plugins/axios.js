export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    config.headers.Authorization =
      process.env.NAME === 'sc'
        ? 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTY5ZTA1ZmM0MjM1MmUxODAxNjg4MyIsIm5hbWUiOiJyYW5keSIsImlzX2FkbWluIjpmYWxzZSwiaWF0IjoxNjE2NzMwMDgyfQ.12u_1ZhMF2KKD1cOw3hJBNiBYE1j37vYn7W_LP3a7Bg'
        : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNWQ1NzZmNzdiNDZkMDAxYTU2ZjBmOSIsIm5hbWUiOiJkZW1pIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE2MTY3MzAyOTl9.nfKjptzQ85liCakwQtUDk3PbLpsL4wD7mzbOO0J9Nvw'
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
