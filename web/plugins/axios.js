export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    config.headers.Authorization =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTY5ZTA1ZmM0MjM1MmUxODAxNjg4MyIsIm5hbWUiOiJyYW5keSIsImlzX2FkbWluIjpmYWxzZSwiaWF0IjoxNjE2MjkzODkxfQ.u5bC4FaifYwxbLOfJY_vyhEMj75t-0htZ9HpBgE0bCw'
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
