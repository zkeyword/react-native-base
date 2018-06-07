import { StyleSheet } from 'react-native'
import { pxToDp } from '../../utils/styles'

export default StyleSheet.create({
    containers: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemPadding: {
        marginLeft: pxToDp(20)
    },
    logo: {
        width: pxToDp(150),
        height: pxToDp(50)
    },
    botton: {
        alignSelf: 'center',
        marginTop: pxToDp(130),
        width: pxToDp(856),
        borderRadius: pxToDp(150)
    }
})
