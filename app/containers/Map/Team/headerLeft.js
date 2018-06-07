import React, { Component } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

@connect(({ teams }) => ({ ...teams }))
class headerLeft extends Component {
    handlePress() {
        this.props.dispatch({
            type: 'teams/setTeamName',
            payload: {
                menberName: this.props.menberInfo.name
            }
        })
        Actions.pop()
    }

    render() {
        return (
            <TouchableOpacity {...this.props} onPress={() => this.handlePress()} style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Text style={{ color: '#fff' }}>取消</Text>
            </TouchableOpacity>
        )
    }
}

export default headerLeft
