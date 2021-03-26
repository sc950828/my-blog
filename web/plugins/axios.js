export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    config.headers.Authorization =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTY5ZTA1ZmM0MjM1MmUxODAxNjg4MyIsIm5hbWUiOiJyYW5keSIsImlzX2FkbWluIjpmYWxzZSwiaWF0IjoxNjE2NzMwMDgyfQ.12u_1ZhMF2KKD1cOw3hJBNiBYE1j37vYn7W_LP3a7Bg'
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
