import { StyleSheet } from 'react-native'
import { pxToDp } from '../../utils/styles'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,.5)',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
    },
    innerContainer: {
        borderRadius: 8,
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
        backgroundColor: '#fff',
        width: pxToDp(740),
        overflow: 'hidden'
    },
    mask: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    modelTitle: {
        width: '100%',
        height: pxToDp(90),
        backgroundColor: '#2d94fd',
        flexDirection: 'row'
    },
    modelTitleTextWrap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    modelTitleText: {
        color: '#fff',
        marginLeft: pxToDp(25)
    },
    modelTitleCloseWrap: {
        justifyContent: 'center'
    },
    modelTitleClose: {
        color: '#fff',
        fontSize: 28,
        marginRight: pxToDp(25)
    },
    modelWrap: {
        flexDirection: 'row'
    },
    bottonWrap: {
        paddingHorizontal: 10
    },
    bottonMain: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: 10,
        borderTopColor: '#ddd',
        borderStyle: ('solid'),
        borderTopWidth: 1
    },
    bottonText: {
        color: '#2c97fd',
        fontSize: 13,
        paddingTop: 10,
        paddingLeft: 20,
        paddingBottom: 0
    }
})
