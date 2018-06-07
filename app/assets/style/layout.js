import { Dimensions } from 'react-native'
// import { pxToDp } from '../../utils/styles'

export const tabBarStyle = {
    backgroundColor: '#FFFFFF'
}

export const navigationOption = {
    navigationBarStyle: {
        backgroundColor: '#2d94fd'
    },
    titleStyle: {
        color: '#ffffff',
        alignSelf: 'center'
    }
}

export const drawerWidth = Dimensions.get('window').width - 100
