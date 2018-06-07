import request from '../utils/request'

// 获得景区信息
export function get() {
    return request('/v0.1/scenics/current')
}
