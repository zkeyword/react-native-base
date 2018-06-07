import { StyleSheet } from 'react-native'
import { pxToDp } from '../../utils/styles'

export default StyleSheet.create({
    content: {
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    name: {
        fontSize: pxToDp(50),
        marginTop: 10
    },
    title: {
        fontSize: pxToDp(50)
    },
    desc: {
        fontSize: pxToDp(42),
        marginTop: 10
    },
    btn: {
        backgroundColor: '#14BBFD',
        borderRadius: 15,
        marginTop: 15,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height: pxToDp(100),
        width: pxToDp(600)
    },
    btnText: {
        color: '#fff',
        fontSize: 13
    }
})
