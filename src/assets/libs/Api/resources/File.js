import Resource from './BaseResource'

class File extends Resource {
    constructor(config, tools, version, path) {
        super(config, tools, version, path)
    }

    async upload(fileform, onProgress) {
        const data = await this.tools.http.post('/v1/files', fileform, {}, onProgress)

        return data
    }
}

export default File