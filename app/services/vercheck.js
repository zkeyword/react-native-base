import request from '../utils/request'

export function get(type) {
    return request(`/versions/${type}/latest`)
}

export function del(token) {
    return request(`/v0.1/auth/tokens/${token}`, {
        method: 'DELETE'
    })
}
