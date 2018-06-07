/* @flow */

import {StyleSheet} from 'react-native'

export const progress = StyleSheet.create({
    modalContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginBottom: 70
    },
    barContainer: {
        flexDirection: 'column',
        height: '100%',
        borderColor: '#641c1c',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        borderWidth: 1
    },
    barPercent: {
        backgroundColor: '#fea34f',
        borderRadius: 8,
        height: '100%'
    },
    text: {
        fontSize: 12,
        marginTop: 10,
        textAlign: 'center',
        color: '#ffffff'
    }
})
