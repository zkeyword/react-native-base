import { StyleSheet } from 'react-native'
import { pxToDp } from '../../../../utils/styles'

export default StyleSheet.create({
    // 声音类型
    item: {
        flexDirection: 'row',
        paddingTop: 10,
        justifyContent: 'space-between'

    },
    itemFirst: {
        borderBottomColor: '#ddd',
        borderStyle: ('solid'),
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemText: {
        color: '#bababa',
        fontSize: 12,
        paddingLeft: 10
    },
    itemTextSelect: {
        color: '#333'
    },
    // 分享
    shareWrap: {
        backgroundColor: '#fff',
        height: pxToDp(440)
    },
    shareTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: pxToDp(100),
        padding: 20
    },
    shareTitleText: {
        fontSize: pxToDp(42)
    },
    shareItemWrap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: pxToDp(300),
        paddingBottom: 20
    },
    shareItem: {
        width: '25%',
        alignItems: 'center'
    },
    shareItemImg: {
        marginBottom: 10
    },
    shareBtnWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        borderTopColor: '#bababa',
        borderTopWidth: 1,
        height: pxToDp(100),
        marginLeft: 20,
        marginRight: 20
    },
    shareBtnText: {
        fontSize: pxToDp(42),
        color: '#bababa'
    }
})
