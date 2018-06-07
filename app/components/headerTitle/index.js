import React, { Component } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { connect } from 'react-redux'

import styles from './style'

@connect(({ map }) => ({ ...map }))
class headerTitle extends Component {
    render() {
        let { title, handlePress, content } = this.props
        return (
            <View style={styles.headerTitle}>
                <TouchableOpacity onPress={handlePress}>
                    <Text style={styles.headerTitleText}>{title}</Text>
                </TouchableOpacity>
                {content}
            </View>
        )
    }
}

export default headerTitle
