import Resource from './BaseResource'
import { parseJwt } from '../utils'

class Auth extends Resource {
    constructor(config, tools, version, path) {
        super(config, tools, version, path)
        this.token = null
    }

    async getAccess() {
        const res = await this.tools.http.get(`${this.api}/me`)

        if (!res || (res && res.error)) {
            sessionStorage.removeItem(this.config.token_key)
            return res
        }

        this.token = res
        sessionStorage.setItem(this.config.token_key, this.token)

        return res
    }

    async refreshAccess() {
        const t = await this.tools.http.post(`${this.api}/me/refresh`)
        this.token = t
        this.tools.emitter.emit('vetify-token', t)
        return t
    }

    async signup(body) {
        const token = await this.tools.http.post(`${this.api}/signup`, body)

        if (token) {
            console.log('auth signup token', token)
            this.token = token
            sessionStorage.setItem(this.config.token_key, this.token)
        }

        this.tools.emitter.emit('signup', token)
        return token
    }

    async signwait(body) {
        const res = await this.tools.http.post(`${this.api}/signwait`, body)
        return res
    }

    async signInWithEmailAndPassword(email, pass) {
        this.token = await this.tools.http.post(`${this.api}/signin`, {
            email: email,
            password: pass
        })

        sessionStorage.setItem(this.config.token_key, this.token)
        this.tools.emitter.emit('signin', this.token)

        return this.token
    }

    async signout(call = true) {
        if (call) await this.tools.http.delete(`${this.api}/me/signout`)

        this.token = null
        sessionStorage.removeItem(this.config.token_key, this.token)

        this.tools.emitter.emit('signout')

        return true
    }

    // verifyEmail(email) {
    //     return this.tools.http.patch(`${this.api}/emails/${email}/verifications`)
    // }

    async verifyToken(token) {
        const t = await this.tools.http.get(`${this.api}/verifications/${token || '_'}`)
        this.tools.emitter.emit('vetify-token', t)
        return t
    }

    // pwd
    passwordRecovery(email) {
        return this.tools.http.post(`${this.api}/password_recovery`, {
            email: email
        })
    }

    verifyPasswordRecovery(code) {
        return this.tools.http.get(`${this.api}/password_recovery`, {
            code: code
        })
    }

    passwordReset(code, pwd) {
        return this.tools.http.patch(`${this.api}/password_recovery`, {
            password: pwd,
            code: code
        })
    }

    get me() {
        if (!this.token) return null
        return parseJwt(this.token)
    }

    get is_super() {
        if (!this.me) return null
        return this.me.role === 'super' || this.me.level <= 1
    }

    get is_dev() {
        if (!this.me) return null
        return this.me.role === 'super' || this.me.level <= 2
    }

    get is_agency() {
        if (!this.me) return null
        return this.me.role === 'agency' || this.me.level <= 3
    }

    get is_admin() {
        if (!this.me) return null
        return this.me.role === 'admin' || this.me.level <= 4
    }

    get is_coach() {
        if (!this.me) return null
        return this.me.type === 'coach'
    }

    get access_token() {
        return this.token || null
    }

    get is_expired() {
        if (!this.me) return true
        return Date.now() >= this.me.exp * 1000
    }

    setAccessToken(string) {
        this.token = string
        sessionStorage.setItem(this.config.token_key, string)
    }
}

export default Auth