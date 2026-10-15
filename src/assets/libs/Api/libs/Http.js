import axios from 'axios'
import qs from 'qs'
import { isWebpSupported } from '../../utils'

export default class HTTP {
    constructor(config = {}, emitter) {
        this.config = config
        this.emitter = emitter

        this.http = axios.create({
            baseURL: this.config.base_url,
            withCredentials: true,
            timeout: this.config.timeout,
            headers: {
                'x-app-id': this.config.app_id
            },
            paramsSerializer: {
                serialize: (params) => {
                    return qs.stringify(params, {
                        arrayFormat: 'repeat',
                        indices: false,
                        allowDots: false,
                        skipNulls: true,
                        format: 'RFC1738'
                    })
                }
            },
            validateStatus: this.config.validate_status
        })

        this.interceptorsRequest()
        this.interceptorsResponse()

        return this
    }

    // interceptors

    interceptorsRequest() {
        this.http.interceptors.request.use((config) => {
            const access_token = sessionStorage.getItem(this.config.token_key) || null

            if (access_token) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${access_token}`,
                    [this.config.prefix + '-access-token']: access_token
                }
            }

            if (isWebpSupported()) {
                config.headers = {
                    ...config.headers,
                    Accept: 'image/webp'
                }
            }

            return config
        }, err => Promise.reject(err))
    }

    interceptorsResponse() {
        let refreshing_token = null

        this.http.interceptors.response.use((response) => {
            // if (this.config.prefix + '-access-token' in response.headers) {
            //     sessionStorage.setItem(this.config.token_key, response.headers[this.config.prefix + '-access-token'])
            // }

            return response
        }, async (err) => {
            const config = err.config
            const token = sessionStorage.getItem(this.config.token_key) || null

            if (err.response) {
                // https://javascript.plainenglish.io/handle-refresh-token-with-axios-1e0f45e9afa
                if (err.response.status === 401) {
                    // refresh_token expired
                    if (!token || config.url === 'v1/auths/me/refresh') {
                        this.emitter.emit('access-token-expired', err)
                        sessionStorage.removeItem(this.config.token_key)
                        refreshing_token = null
                        return Promise.reject(err)
                    }

                    if (!config._retry) {
                        config._retry = true
                        this.emitter.emit('access-token-refreshing')

                        try {
                            refreshing_token = refreshing_token || this.post('v1/auths/me/refresh', { access_token: token })
                            const access = await refreshing_token
                            refreshing_token = null

                            sessionStorage.setItem(this.config.token_key, access.token)
                            this.http.defaults.headers.common[this.config.prefix + '-access-token'] = access.token
                            this.emitter.emit('access-token-refreshed', access.token)
                            return this.http(config)
                        } catch (err2) {
                            this.emitter.emit('access-token-expired', err2)
                            sessionStorage.removeItem(this.config.token_key)
                            refreshing_token = null
                            return Promise.reject(err2)
                        }
                    }
                } else if (err.response.status === 403) {
                    this.emitter.emit('permission-denied')
                }
            }

            refreshing_token = null
            this.emitter.emit('http-error', err.response && err.response.data ? err.response.data : err.response)
            return Promise.reject(err)
        })
    }

    // publics

    options(resource, params) {
        return new Promise((resolve, reject) => {
            this.http.options(resource, { params: params }).then((res) => {
                this.emitter.emit('http-options-success', res.data)
                return resolve(res.data)
            }).catch((err) => {
                this.emitter.emit('http-get-error', err.response && err.response.data ? err.response.data : err.response)
                return reject(err.response && err.response.data ? err.response.data : err.response)
            })
        })
    }

    get(resource, params) {
        return new Promise((resolve, reject) => {
            this.http.get(resource, { params: params }).then((res) => {
                this.emitter.emit('http-get-success', res.data)
                return resolve(res.data)
            }).catch((err) => {
                this.emitter.emit('http-get-error', err.response && err.response.data ? err.response.data : err.response)
                return reject(err.response && err.response.data ? err.response.data : err.response)
            })
        })
    }

    post(resource, data, headers, onProgress = () => { }) {
        return new Promise((resolve, reject) => {
            this.http.post(resource, data, { headers: headers, onUploadProgress: onProgress }).then((res) => {
                this.emitter.emit('http-post-success', res)
                return resolve(res.data)
            }).catch((err) => {
                this.emitter.emit('http-post-error', err.response && err.response.data ? err.response.data : err.response)
                return reject(err.response && err.response.data ? err.response.data : err.response)
            })
        })
    }

    put(resource, data) {
        return new Promise((resolve, reject) => {
            this.http.put(resource, data)
                .then((res) => {
                    this.emitter.emit('http-put-success', res)
                    return resolve(res.data)
                })
                .catch((err) => {
                    this.emitter.emit('http-post-error', err.response && err.response.data ? err.response.data : err.response)
                    reject(err.response && err.response.data ? err.response.data : err.response)
                })
        })
    }

    patch(resource, data) {
        return new Promise((resolve, reject) => {
            this.http.patch(resource, data)
                .then((res) => {
                    this.emitter.emit('http-patch-success', res)
                    return resolve(res.data)
                })
                .catch(err => {
                    this.emitter.emit('http-patch-error', err.response && err.response.data ? err.response.data : err.response)
                    return reject(err.response && err.response.data ? err.response.data : err.response)
                })
        })
    }

    delete(resource, data, headers) {
        return new Promise((resolve, reject) => {
            this.http.delete(resource, {
                data: data,
                headers: headers
            })
                .then(res => {
                    this.emitter.emit('http-delete-success', res)
                    return resolve(res.data)
                })
                .catch((err) => {
                    this.emitter.emit('http-delete-error', err.response && err.response.data ? err.response.data : err.response)
                    return reject(err.response && err.response.data ? err.response.data : err.response)
                })
        })
    }
}