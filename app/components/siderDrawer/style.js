import { StyleSheet, Dimensions } from 'react-native'
import { pxToDp } from '../../utils/styles'

export default StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: Dimensions.get('window').width - 100,
        height: Dimensions.get('window').height,
        overflow: 'hidden'
    },
    background: {
        width: Dimensions.get('window').width - 100,
        position: 'absolute',
        bottom: 0,
        zIndex: -1
    },
    header: {
        height: 250
    },
    headerMain: {
        position: 'absolute',
        top: pxToDp(200),
        zIndex: 1
    },
    headerBg: {
        height: '100%',
        width: '100%'
    },
    avatarBox: {
        flexDirection: 'row',
        padding: pxToDp(60)
    },
    avatarWrap: {
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderRadius: pxToDp(30),
        borderWidth: pxToDp(10),
        marginRight: pxToDp(60),
        overflow: 'hidden',
        height: pxToDp(200),
        width: pxToDp(200),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        height: pxToDp(200),
        width: pxToDp(200)
    },
    avatarIcon: {
        fontSize: 50
    },
    userName: {
        height: pxToDp(200),
        width: pxToDp(440),
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    userNameText: {
        fontSize: pxToDp(60),
        color: '#fff'
    },
    userPhone: {
        fontSize: pxToDp(48),
        paddingLeft: pxToDp(60),
        paddingBottom: pxToDp(90),
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    list: {
        paddingTop: pxToDp(60)
    },
    item: {
        flexDirection: 'row',
        paddingLeft: pxToDp(60),
        paddingBottom: pxToDp(40)
    },
    itemIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: pxToDp(72),
        height: pxToDp(72)
    },
    itemText: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        height: pxToDp(72),
        fontSize: pxToDp(48),
        paddingLeft: pxToDp(30)
    }
})
