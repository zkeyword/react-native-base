import { StyleSheet } from 'react-native'
import { pxToDp } from '../../../utils/styles'

export default StyleSheet.create({
    // 队伍按钮
    iconText: {
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 2,
        left: 0,
        right: 0,
        fontSize: 10,
        textAlign: 'center',
        color: '#4861fd'
    },
    // 创建队伍弹框
    modelHeader: {
        width: '100%',
        backgroundColor: '#4c60fd'
    },
    modelBtn: {
        backgroundColor: '#1DA3FD',
        borderRadius: 15,
        marginHorizontal: 15,
        marginVertical: 10,
        overflow: 'hidden'
    },
    modelBtnText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 13,
        marginVertical: 10,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    modelInput: {
        borderRadius: 40,
        borderColor: '#f4f4f4',
        borderWidth: 1,
        borderStyle: ('solid'),
        height: 40,
        marginHorizontal: 15,
        marginBottom: 10,
        fontSize: 13,
        textAlign: 'center'
    },
    modelInputClose: {
        position: 'absolute',
        bottom: 21,
        right: 30
    },
    modelInputCloseIcon: {
        fontSize: 18,
        color: '#ccc'
    },
    // 队伍设置
    menberList: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 5
    },
    operationWrap: {
        flexDirection: 'row'
    },
    operationBtn: {
        flexDirection: 'column',
        marginTop: 10,
        marginLeft: 10
    },
    operationBtnIcon: {
        width: 30,
        height: 30,
        borderRadius: 30,
        borderColor: '#eee',
        borderWidth: 2,
        borderStyle: ('solid'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    menberItem: {
        flexDirection: 'column',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    menberItemText: {
        fontSize: 10,
        textAlign: 'center'
    },
    menberAvatar: {
        overflow: 'hidden',
        borderRadius: 15
    },
    menberAvatarImg: {
        width: 30,
        height: 30,
        borderRadius: 15
    },
    menberDelIcon: {
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
        color: '#000',
        fontSize: 20
    },
    menberSettingPadding: {
        padding: 10
    },
    menberSettingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginVertical: 5,
        position: 'relative'
    },
    menberItemArrow: {
        position: 'absolute',
        top: 10,
        right: 5,
        fontSize: 18
    },
    menberSettingItemLeft: {
        margin: 10
    },
    menberSettingItemRight: {
        color: '#666666',
        margin: 10,
        marginRight: 20
    },
    menberSettingSubmit: {
        backgroundColor: '#e55d5d',
        borderRadius: 15,
        marginHorizontal: 15,
        overflow: 'hidden',
        marginTop: 30
    },
    menberSettingSubmitText: {
        textAlign: 'center',
        margin: 10,
        color: 'white'
    },
    // 分享
    shareWrap: {
        backgroundColor: '#fff',
        height: pxToDp(600)
    },
    shareTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: pxToDp(200)
    },
    shareTitleText: {
        fontSize: pxToDp(42),
        marginVertical: 10
    },
    shareSubTitleText: {
        fontSize: pxToDp(30),
        marginVertical: 5
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
    },
    // 修改资料弹框
    popupWrap: {
        backgroundColor: '#fff'
    },
    popupItemWrap: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    popupBtnWrap: {
        flexDirection: 'row',
        borderTopColor: '#bababa',
        borderTopWidth: 1,
        height: 40,
        alignItems: 'center'
    },
    popupBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    popupBtnTextOk: {
        color: '#3698fd'
    }
})
