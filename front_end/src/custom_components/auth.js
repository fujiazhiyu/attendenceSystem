export default {

  login(email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    pretendRequest(email, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        localStorage.account = res.account
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },

  getToken() {
    return localStorage.token
  },

  getAccount() {
    return localStorage.account
  },

  logout(cb) {
    delete localStorage.token
    delete localStorage.account
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.token
  },

  onChange() {}
}

// function pretendRequest(email, pass, cb) {
//   setTimeout(() => {
//     if (email === 'joe@example.com' && pass === 'password1') {
//       cb({
//         authenticated: true,
//         token: Math.random().toString(36).substring(7)
//       })
//     } else {
//       cb({ authenticated: false })
//     }
//   }, 0)
// };

function pretendRequest(email, pass, cb) {
  setTimeout(() => {
    if (email === 'yufujia' && pass === "fish95520") {
      var Account = JSON.stringify({username: email, password: pass});
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7),
        account: Account
      })
    } else {
      cb({ authenticated: false })
    }
  }, 0)
};
