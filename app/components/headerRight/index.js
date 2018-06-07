import React, { Component } from 'react'
import { TouchableOpacity, Image } from 'react-native'

class headerRight extends Component {
    render() {
        let { onPressHeaderRight } = this.props
        return (
            <TouchableOpacity {...this.props} onPress={onPressHeaderRight} style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Image
                    source={require('../../assets/img/map_more_white.png')}
                />
            </TouchableOpacity>
        )
    }
}

export default headerRight
