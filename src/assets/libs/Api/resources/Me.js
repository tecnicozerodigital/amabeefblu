import Resource from './BaseResource'

class Me extends Resource {
    constructor(config, tools, version, path) {
        super(config, tools, version, path)

        this.user = null
    }

    async getMe() {
        const doc = await this.tools.http.get(`${this.api}`)
        this.user = doc
    }
}

export default Me