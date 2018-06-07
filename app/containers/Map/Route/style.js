import { StyleSheet } from 'react-native'
import { pxToDp } from '../../../utils/styles'

export default StyleSheet.create({
    containers: {
        backgroundColor: '#f6f6fa',
        flex: 1
    },
    player: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        margin: pxToDp(50),
        padding: pxToDp(50)
    },
    main: {
        backgroundColor: '#ffffff',
        padding: pxToDp(50),
        flex: 1
    },
    title: {
        paddingBottom: pxToDp(70)
    },
    titleText: {
        fontSize: pxToDp(52)
    },
    content: {
    },
    contentText: {
        fontSize: pxToDp(42),
        lineHeight: pxToDp(80)
    }
})
