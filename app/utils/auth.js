var CryptoJS = require('crypto-js')
var forge = require('node-forge')
export function randomCode(codeLength = 8) {
    let code = ''
    let chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    // 所有候选组成验证码的字，当然也可以用中文的

    for (let i = 0; i < codeLength; i++) {
        let charIndex = Math.floor(Math.random() * 36)
        code += chars[charIndex]
    }
    return code
}

export function getAuthorization(method, url, host, accessToken, macKey) {
    method = method.toUpperCase()
    url = encodeURI(url)

    let nonce = new Date().getTime() + ':' + randomCode()

    let _getMac = () => {
        let path
        let pos = url.indexOf('://')
        if (pos > 0) {
            path = url.substring(pos + 3)
            pos = path.indexOf('/')
            host = path.substr(0, pos)
            path = path.substring(pos)
        } else {
            path = url
        }
        let requestContent = nonce + '\n' + method + '\n' + path + '\n' + host + '\n'
        let hash = CryptoJS.HmacSHA256(requestContent, macKey)
        let mac = hash.toString(CryptoJS.enc.Base64)
        return mac
    }
    let mac = _getMac()

    let strAuth = `MAC id="${accessToken}",nonce="${nonce}",mac="${mac}"`
    return strAuth
}

export function passWord(pwd) {
    let handle = str => {
        let md = forge.md.md5.create()
        md.update(str)
        return md.digest().toHex()
    }
    return handle(handle(pwd))
}
