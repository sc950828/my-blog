export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    config.headers.Authorization =
      process.env.NAME === 'sc'
        ? 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTY5ZTA1ZmM0MjM1MmUxODAxNjg4MyIsImVtYWlsIjoiMTI4NzUzMDA5N0BxcS5jb20iLCJuYW1lIjoicmFuZHkiLCJuaWNrTmFtZSI6IuiLj-e6ryIsImlzX2FkbWluIjpmYWxzZSwiaWF0IjoxNjE4NTYwNDEzfQ.Cd2s4OegEHvRlkTy36T6_WooxK8W4dL9BDKhBICadOU'
        : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNWQ1NzZmNzdiNDZkMDAxYTU2ZjBmOSIsImVtYWlsIjoiMTI1MjkwMjQ1M0BxcS5jb20iLCJuYW1lIjoiZGVtaSIsIm5pY2tOYW1lIjoi5pmP5rW354eVIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE2MTg1NjA0NzN9.y9vQFm9zpPg5huZ3B5rlCACmsrLuMY69M8qVpwc1mfU'
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
