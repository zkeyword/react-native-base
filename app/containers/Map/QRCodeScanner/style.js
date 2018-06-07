import { StyleSheet, Dimensions } from 'react-native'
// import { pxToDp } from '../../../utils/styles'

export default StyleSheet.create({
    zeroContainer: {
        height: 0,
        flex: 0
    },

    cameraContainer: {
        height: Dimensions.get('window').height
    }
})
