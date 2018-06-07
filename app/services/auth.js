import request from '../utils/request'

export function post(data) {
    return request('/v0.1/auth/tokens', {
        method: 'POST',
        data
    })
}

export function del(token) {
    return request(`/v0.1/auth/tokens/${token}`, {
        method: 'DELETE'
    })
}
