import { StyleSheet } from 'react-native'

export default StyleSheet.create({
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
    }
})
