import { StyleSheet } from 'react-native'
// import { pxToDp } from '../../../utils/styles'

export default StyleSheet.create({
    tabBarWrap: {
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
    },
    tabBar: {
        flexDirection: 'row'
    },
    tabBarItem: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 10
    },
    tabBarItemIcon: {
        width: 30,
        height: 30
    },
    tabBarItemText: {
        color: 'gray',
        fontSize: 10
    }
})
