import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import styles from './style'

@connect(({ auth }) => ({ ...auth }))
class ComingSoon extends Component {
    state = {
        text: '敬请期待'
    }

    render() {
        return (
            <ScrollView keyboardDismissMode={('interactive', 'on-drag')} overScrollMode='always' showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.containers}>
                <View style={styles.containers}><Text style={styles.textStyle}>{this.state.text}</Text></View>
            </ScrollView>
        )
    }
}

export default ComingSoon
