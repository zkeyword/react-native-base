import React, { Component } from 'react'
import { TouchableOpacity, Image, View } from 'react-native'
import { connect } from 'react-redux'

@connect(({ hitpointplay }) => ({ ...hitpointplay }))
class Audio extends Component {
    onSwitch = () => {
        this.props.dispatch(
            {
                type: 'hitpointplay/set',
                payload: {
                    isAuto: !this.props.isAuto
                }
            }
        )
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.onSwitch()}>
                    <Image source={this.props.isAuto ? require('./img/map_btn_voice_auto.png') : require('./img/map_btn_voice_closed.png')} />
                </TouchableOpacity>
            </View>
        )
    }
}

export default Audio
