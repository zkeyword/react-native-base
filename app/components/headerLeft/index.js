import React, { Component } from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'

class headerLeft extends Component {
    handlePress() {
        Actions.drawerOpen()
    }

    render() {
        return (
            <TouchableOpacity {...this.props} onPress={this.handlePress} style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Image
                    source={require('../../assets/img/login_userid_white.png')}
                />
            </TouchableOpacity>
        )
    }
}

export default headerLeft
