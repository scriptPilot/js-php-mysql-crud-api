export default function useAPI(endpoint = '/api.php') {
  return {
    endpoint,
    setEndpoint(endpoint) {
      this.endpoint = endpoint
    },
    request(path, options = {}) {
      path = (path.substr(0, 1) !== '/' ? '/' : '') + path
      if (options.body && typeof options.body !== 'string') {
        options.body = JSON.stringify(options.body)
      }
      options.credentials = 'include'    
      return new Promise(async (resolve, reject) => {
        try {
          const resp = await fetch(this.endpoint + path, options) 
          if (resp.status === 200 || resp.ok) {
            const json = await resp.json()
            resolve(json.records || json)
          } else {
            reject({ code: resp.status, message: resp.statusText })
          }
        } catch (err) {       
          reject({ code: err.code || -1, message: err.message })
        }
      })
    },
    create(table, item) {
      return this.request(`records/${table}`, { method: 'post', body: item })
    },
    read(table, key) {
      return this.request(`records/${table}/${key}`)
    },
    update(table, key, item) {
      return this.request(`records/${table}/${key}`, { method: 'put', body: item })
    },
    delete(table, key) {
      return this.request(`records/${table}/${key}`, { method: 'delete' })
    },
    list(path) {
      return this.request('records/' + path)
    },
    me() {
      return this.request('me')
    },
    register(username, password) {
      return this.request('register', { method: 'post', body: { username, password } })
    },
    login(username, password) {
      return this.request('login', { method: 'post', body: { username, password } })
    },
    password(username, password, newPassword) {
      return this.request('password', { method: 'post', body: { username, password, newPassword } })
    },
    logout() {
      return this.request('logout', { method: 'post' })
    }
  }
}