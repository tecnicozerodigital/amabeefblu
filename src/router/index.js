import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import Err404 from '../views/Err404.vue'
import PrivacyPolicy from '../views/policies/PrivacyPolicy.vue'
import CookiePolicy from '../views/policies/CookiePolicy.vue'
// import Index from '../views/Index.vue'
import Offerte from '../views/Offerte.vue'

// Rotte rimosse il 2026-08-05 perche' le viste erano rimaste vuote
// (template senza contenuto) ma rispondevano 200 ed erano indicizzabili:
// /chi-siamo, /galleria-immagini, /news, /news/:slug, /contatti,
// /domande-frequenti. I componenti restano in src/views/ pronti da
// riagganciare quando avranno contenuto; nginx risponde 410 su quegli URL
// per farli togliere dall'indice di Google.
/**
 * webpackPreload: true: alta priorità (usalo per home o la prossima vista quasi certa)
 * webpackPrefetch: true: bassa priorità quando il browser è idle (evita flood globale, vedi sotto).
 */

const routes = [
    {
        path: '/:pathMatch(.*)*',
        redirect: '/errors/404'
    },
    {
        path: '/errors/404',
        name: 'error_404',
        component: Err404
    },
    {
        path: '/policies/privacy-policy',
        name: 'privacy_policy',
        component: PrivacyPolicy
    },
    {
        path: '/policies/cookie-policy',
        name: 'cookie_policy',
        component: CookiePolicy
    },
    //
    {
        path: '/',
        name: 'home',
        component: () => import(
            /* webpackChunkName: "view-home", webpackPreload: true */
            '../views/Home.vue'
        )
    },
    {
        path: '/offerte',
        name: 'offerte',
        component: Offerte
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0, left: 0 }
    }
})

router.beforeEach((to, from, next) => {
    console.log('[Router ext] beforeEach()')

    store.commit('set_page_enter', to.fullPath)
    store.commit('set_page_leave', from.fullPath)
    store.commit('set_is_in_transition', true)

    next()
})

export default router
