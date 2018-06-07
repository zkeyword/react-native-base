import { StyleSheet } from 'react-native'
import { pxToDp } from '../../utils/styles'

export default StyleSheet.create({
    container: {
        paddingTop: pxToDp(24),
        paddingBottom: pxToDp(24)
    },
    main: {
        flexDirection: 'row',
        position: 'relative'
    },
    loadingWrap: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        zIndex: 1
    },
    loading: {
        paddingTop: pxToDp(24)
    },
    left: {
        width: pxToDp(80),
        height: pxToDp(80)
    },
    right: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        marginLeft: pxToDp(24)
    },
    rightSlider: {
        zIndex: 1
    },
    rightBackground: {
        width: '96%',
        height: pxToDp(10),
        zIndex: 0,
        backgroundColor: '#ddd',
        borderRadius: 5,
        position: 'absolute',
        marginLeft: '2%',
        marginRight: '2%'
    }
})
