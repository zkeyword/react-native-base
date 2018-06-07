import request from '../utils/request'

// 创建队伍
export function post(data) {
    return request('/v0.1/teams', {
        method: 'POST',
        data
    })
}

// 解散队伍
export function del(data) {
    return request(`/v0.1/teams/${data.id}`, {
        method: 'DELETE'
    })
}

// 修改队伍
export function put(data) {
    return request(`/v0.1/teams/${data.id}`, {
        method: 'PUT',
        data
    })
}

// 加入队伍
export function join(data) {
    return request(`/v0.1/teams/tokens/${data.token}`, {
        method: 'PUT',
        data
    })
}

// 离开队伍
export function quitTeam(data) {
    return request(`/v0.1/teams/${data.id}/members/${data.userId}`, {
        method: 'DELETE'
    })
}

// 获取队伍成员信息
export function getMember(data) {
    return request(`/v0.1/teams/members/${data.id}`)
}

// 上传队伍成员定位信息`
export function putMemberLocation(data) {
    return request(`/v0.1/teams/${data.token}/members/${data.userId}`, {
        method: 'PUT',
        data
    })
}

// 删除队伍成员
export function delMember(data) {
    return request(`/v0.1/teams/${data.id}/members/${data.userId}`, {
        method: 'DELETE',
        data
    })
}
