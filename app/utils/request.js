import axios from 'axios'
import storage from './storage'
import { getAuthorization } from './auth'
import { url, host, ossUrl } from '../config'

axios.defaults.validateStatus = false
axios.defaults.baseURL = url

function checkStatus(response, url, options) {
    console.log('Request url:', url, '\noptions:', options, '\nResponse data:', response.data)

    if (response.status >= 200 && response.status < 300) {
        return response
    } else if (response.status >= 500 && response.data.message) {
        response.statusText = response.data.message
    }

    const error = new Error(response.statusText)
    error.response = response
    throw error
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(reqUrl, options = { method: 'GET' }) {
    delete axios.defaults.headers.common.Authorization
    let fullUrl = url + reqUrl
    if (!/\/auth\/tokens$|\/users\/registers$|\/users\/password\/forget$|\/sms\/registers$|\/sms\/registers\/verification$|users\/password\/forget$|sms\/forget_pwd$|sms\/forget_pwd\/verification$/g.test(reqUrl)) {
        let accessToken = await storage.get('accessToken')
        let secret = await storage.get('secret')
        try {
            axios.defaults.headers.common['Authorization'] = getAuthorization(options.method, fullUrl, host, accessToken, secret)
        } catch (error) {
            console.error('没有登录')
        }
    }
    const response = await axios(reqUrl, options).then((response) => checkStatus(response, fullUrl, options)).catch((err) => {
        console.log('Request url:', fullUrl, options)
        return err.response.data
    })
    return response
}

export async function ossUpload(reqUrl, data) {
    delete axios.defaults.headers.common.Authorization
    console.log('Request url:', ossUrl + reqUrl)
    const config = {
        headers: { 'content-type': 'multipart/form-data' }
    }
    const formData = new FormData()
    formData.append('file', data)
    const response = await axios.post(ossUrl + reqUrl, formData, config).then(checkStatus).catch((err) => {
        return err.response.data
    })
    return response
}
