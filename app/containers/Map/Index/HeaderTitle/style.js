import { StyleSheet } from 'react-native'
import { pxToDp } from '../../../../utils/styles'

export default StyleSheet.create({
    modelWrap: {
        padding: pxToDp(30)
    },
    modelImagesWrap: {
    },
    modelImageItem: {
        height: 100,
        width: 100,
        overflow: 'hidden',
        marginLeft: 10
    },
    modelImageItemFirst: {
        marginLeft: 0
    },
    modelImage: {
        height: 100,
        width: 100
    },
    modelTextWrap: {
        height: pxToDp(312),
        marginTop: pxToDp(24),
        marginBottom: pxToDp(24)
    },
    p: {
        lineHeight: 20
    },
    br: {
        padding: 0
    },
    modelAddress: {
        borderTopColor: '#ddd',
        borderStyle: ('solid'),
        borderTopWidth: 1,
        paddingTop: pxToDp(34),
        paddingBottom: pxToDp(34)
    },
    modelOpenTime: {
        borderTopColor: '#ddd',
        borderBottomColor: '#ddd',
        borderStyle: ('solid'),
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingTop: pxToDp(34),
        paddingBottom: pxToDp(34)
    }
})
