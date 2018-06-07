import React, { Component } from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'

class HeaderLeftBack extends Component {
    render() {
        return (
            <TouchableOpacity
                style={{ paddingLeft: 20, paddingRight: 20 }}
                activeOpacity={0.5}
                onPress={() => {
                    Actions.pop()
                }}
            >
                <Image
                    source={require('../../assets/img/back.png')}
                />
            </TouchableOpacity>
        )
    }
}

export default HeaderLeftBack
