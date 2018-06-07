/** debug模式下，图片的地址需要进一步处理 */
export function requireImage(src) {
    if (src !== null) {
        var matchs = src.match(/app\/(.*)/g)
        if (matchs !== null) {
            src = matchs[0]
            src = /@/.test(src) ? src.split('@') : src.split('.')
            return src[0].replace(/\//g, '_').toLowerCase()
        } else {
            return null
        }
    } else {
        return null
    }
}
