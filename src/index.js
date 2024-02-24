export default function useAPI(endpoint = '/api.php') {
  const api = {
    endpoint,
    setEndpoint(endpoint) {
      api.endpoint = endpoint
    },
    request(path, options = {}) {
      path = (path.substr(0, 1) !== '/' ? '/' : '') + path
      if (options.body && typeof options.body !== 'string') {
        options.body = JSON.stringify(options.body)
      }
      options.credentials = 'include'    
      return new Promise(async (resolve, reject) => {
        try {
          const resp = await fetch(api.endpoint + path, options) 
          const text = await resp.text()
          if (resp.status === 200 || resp.ok) {
            try {
              const json = JSON.parse(text)
              resolve(json.records || json)
            } catch (err) {
              reject({ code: err.code || -1, message: err.message, text })
            }
          } else {
            try {
              const json = JSON.parse(text)
              reject({ code: json.code, message: json.message })
            } catch (err) {
              reject({ code: resp.status, message: resp.statusText, text })
            }
          }
        } catch (err) {   
          reject({ code: err.code || -1, message: err.message })
        }
      })
    },
    create(table, item) {
      return api.request(`records/${table}`, { method: 'post', body: item })
    },
    read(table, key) {
      return api.request(`records/${table}/${key}`)
    },
    update(table, key, item) {
      return api.request(`records/${table}/${key}`, { method: 'put', body: item })
    },
    delete(table, key) {
      return api.request(`records/${table}/${key}`, { method: 'delete' })
    },
    list(path) {
      return api.request('records/' + path)
    },
    me() {
      return api.request('me')
    },
    register(username, password) {
      return api.request('register', { method: 'post', body: { username, password } })
    },
    login(username, password) {
      return api.request('login', { method: 'post', body: { username, password } })
    },
    password(username, password, newPassword) {
      return api.request('password', { method: 'post', body: { username, password, newPassword } })
    },
    logout() {
      return api.request('logout', { method: 'post' })
    }
  }
  return api
}