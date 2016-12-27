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

function pretendRequest(email, pass, cb) {
  const accountInfo = [{
    id: '201612001', username: 'yufujia', password: 'fish95520', position: '2'
  },{
    id: '201612002', username: 'yuyiding', password: '98647095', position: '1'
  },{
    id: '201612003', username: 'yuergou', password: '02219303', position: '0'
  }]
  setTimeout(() => {
    var accountInfa = fetchData()
    var authInfo = accountInfo.filter(function(item, index, array) {
      return item.username === email && item.password === pass
    })
    if (authInfo.length === 1) {
      var Account = JSON.stringify(authInfo[0]);
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

function fetchData() {
  fetch('http://end.attendsys.com:3000/staffInfo', {
    method: 'POST',
    mode: 'cors',
  }).then(function(res) {
    if(res.status === 'ok') {
      return res.json()
    }else {
      return ''
    }
  }).then(function(data) {
    return data
  })
};
