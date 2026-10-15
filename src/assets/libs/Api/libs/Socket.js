import store from '@/store'
import Io from 'socket.io-client'
import platform from 'platform'

const Socket = {
  ref: null,
  init: (uri) => {
    Socket.ref = Io(uri, {
      query: {
        role: 'OWNER'
      }
    })

    Socket.ref.on('connection', (data) => {
      console.log(data)
    })

    Socket.ref.on('customer-joined', (data) => {
      store.commit('SET_ACTIVE_CUSTOMERS', data.actives.map(i => platform.parse(i.userAgent)))
    })

    Socket.ref.on('customer-leaved', (data) => {
      store.commit('SET_ACTIVE_CUSTOMERS', data.actives.map(i => platform.parse(i.userAgent)))
    })
  }
}

export default Socket
