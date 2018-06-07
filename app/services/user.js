import request, { ossUpload } from '../utils/request'

// 用户注册
export function userRegister(data) {
    return request('/v0.1/users/registers', {
        method: 'POST',
        data
    })
}

// 获得用户注册的短信验证码
export function getSMSCodeForRegister(data) {
    return request(`/v0.1/sms/registers`, {
        method: 'POST',
        data
    })
}

// 忘记密码
export function forgetPwd(data) {
    return request('/v0.1/users/password/forget', {
        method: 'PUT',
        data
    })
}

// 获取忘记密码的短信验证码
export function getSMSCodeForForget(data) {
    return request(`/v0.1/sms/forget_pwd`, {
        method: 'POST',
        data
    })
}

// 通过accessToken获得用户信息
export function getUserInfo(accessToken) {
    return request(`/v0.1/users/tokens/${accessToken}`)
}

// 修改密码
export function modifyPwd(data) {
    return request(`/v0.1/users/${data.userId}/password`, {
        method: 'PUT',
        data
    })
}

// 头像上传
export function imageUpload(data) {
    return ossUpload(`/v0.1/upload?bucket=litchisea`, data)
}

// 编辑用户
export function editUser(data) {
    return request(`/v0.1/users/${data.id}`, {
        method: 'PUT',
        data
    })
}
