import {
    createApp
    // reactive
} from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import components from './components'
import directives from './directives'
// import filters from './filters'
import { mqPlugin } from './plugins/mq'

// import Api from './assets/libs/Api'
import { useToast } from 'vue-toastification'
import { createHead, VueHeadMixin } from '@unhead/vue'

// css
import './assets/styles/index.scss'
import 'lenis/dist/lenis.css'

// Dinero.defaultCurrency = 'EUR'
// Dinero.globalLocale = 'it-IT'
// Dinero.defaultPrecision = 4

const app = createApp(App)
app.use(mqPlugin)

app.directive('prerender', {
    mounted(el, binding) {
        el.setAttribute('data-prerender', binding.value || 'skip')
    }
})

// const api = new Api({
//     app_id: 'amabeef',
//     prefix: 'ambf'
// })
const head = createHead()

// app.use(ElementPlus, {
//     size: 'large'
// })

app.mixin(VueHeadMixin)

// app.use(Vuesax)
// app.config.globalProperties.$api = reactive(api)
app.config.globalProperties.$toast = useToast()
// app.config.globalProperties.$filters = filters
// app.config.globalProperties.$dinero = Dinero

// window.$api = app.config.globalProperties.$api

components(app)
directives(app)

// app.config.errorHandler = (err, vm, info) => {
//     console.log('error handler', err, vm, info)
//     // const payload = Object.values(err.payload || {})
//     let message = err.message || err.code

//     if (err.code === 'resource.validation' && process.env.NODE_ENV === 'development') {
//         message += Object.values(err.fields)
//     }

//     // vm.$toast.error(String(message))
//     return message
// }

app.use(head).use(store).use(router) // .mount('#app', true)

router.isReady().then(() => {
    app.mount('#app', true)
})