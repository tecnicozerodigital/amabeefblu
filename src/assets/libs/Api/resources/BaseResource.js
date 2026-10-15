class Resource {
    constructor(config, tools, version, path) {
        this.config = config
        this.version = '/' + version
        this.path = '/' + path
        this.api = this.version + this.path
        this.tools = tools
        this.model_name = this.constructor.name
    }

    on(name, cb) {
        const isArr = Array.isArray(name)

        if (isArr) return name.forEach(evt => this.tools.emitter.on(evt, cb))

        return this.tools.emitter.on(name, cb)
    }

    off(name) {
        const isArr = Array.isArray(name)

        if (isArr) return name.forEach(evt => this.tools.emitter.off(evt))

        this.tools.emitter.off(name)
    }

    async list(query, cb) {
        const data = await this.tools.http.get(this.api, query)
        this.tools.emitter.emit('list', data)
        if (cb && typeof cb === 'function') cb(data)
        return data
    }

    async doc(id, query, cb) {
        const data = await this.tools.http.get(this.api + '/' + id, query)
        this.tools.emitter.emit('doc', data)
        if (cb && typeof cb === 'function') cb(data)
        return data
    }

    async save(id, body, cb) {
        const data = await this.tools.http[id ? 'put' : 'post'](id ? this.api + '/' + id : this.api, body)
        this.tools.emitter.emit('save', data)
        if (cb && typeof cb === 'function') cb(data)
        return data
    }

    async create(body, cb) {
        let data = null
        if (Array.isArray(body) && body.length > 0) data = await this.tools.http.post(this.api, { items: body })
        else data = await this.tools.http.post(this.api, body)

        this.tools.emitter.emit('create', data)
        if (cb && typeof cb === 'function') cb(data)
        return data
    }

    async update(id, body, cb) {
        let data = null
        if (id === 'many') data = await this.tools.http.put(this.api + '/many', { items: body })
        else data = await this.tools.http.put(this.api + '/' + id, body)

        this.tools.emitter.emit('update', data)
        if (cb && typeof cb === 'function') cb(data)
        return data
    }

    async modify(id, body, cb) {
        let data = null
        if (id === 'many') data = await this.tools.http.patch(this.api + '/many', { items: body })
        else data = await this.tools.http.patch(this.api + '/' + id, body)

        this.tools.emitter.emit('modify', data)
        if (cb && typeof cb === 'function') cb(data)
        return data
    }

    async remove(ids, before, cb) {
        const call = async () => {
            const data = await this.tools.http.delete(this.api + '/many', { ids: Array.isArray(ids) ? ids : [ids] })
            this.tools.emitter.emit('remove', data)
            if (typeof cb === 'function') cb(data)
            return data
        }

        if (before && typeof before === 'function') return before(call)

        const data = await call()

        return data
    }
}

export default Resource