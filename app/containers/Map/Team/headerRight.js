import React, { Component } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

@connect(({ teams }) => ({ ...teams }))
class headerRight extends Component {
    handlePress() {
        this.props.dispatch({
            type: 'teams/putTeam',
            payload: {
                name: this.props.menberName,
                id: this.props.menberInfo.id
            }
        })
        Actions.pop()
    }

    render() {
        return (
            <TouchableOpacity {...this.props} onPress={() => this.handlePress()} style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Text style={{ color: '#fff' }}>保存</Text>
            </TouchableOpacity>
        )
    }
}

export default headerRight
