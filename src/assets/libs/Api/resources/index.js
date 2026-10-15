import Auth from './Auth'
import Geo from './Geo'
import File from './File'
import UserExp from './UserExp'
import Me from './Me'

export const resources = {
    auth: {
        v: 'v1',
        path: 'auths',
        class: Auth
    },
    me: {
        v: 'v1',
        path: 'me',
        class: Me
    },
    geo: {
        v: 'v1',
        path: 'geos',
        class: Geo
    },
    files: {
        v: 'v1',
        path: 'files',
        class: File
    },
    users_exps: {
        v: 'v1',
        path: 'users_exps',
        class: UserExp
    }
}

export function genResources(config, tools) {
    for (const key in resources) {
        const resource = resources[key]
        const Class = resource.class
        resources[key] = new Class(config, tools, resource.v, resource.path)
    }

    return resources
}