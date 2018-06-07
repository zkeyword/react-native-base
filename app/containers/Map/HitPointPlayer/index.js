import React, { Component } from 'react'
import { TouchableOpacity, Image, View, Text } from 'react-native'
import Video from 'react-native-video'

class PlayerBar extends Component {
    state = {
        duration: 0,
        currentTime: 0.0,
        pause: true,
        playBtn: require('../../../components/player/img/play.png')
    }

    loadStart = (data) => {

    }

    setTime = (data) => {
        this.setState({
            currentTime: data.currentTime
        })
    }

    setDuration = (data) => {
        this.setState({
            duration: data.duration
        })
        this.playAction()
    }

    onEnd = () => {
        this.props.onEnd()
    }

    videoError = () => {
        this.props.onEnd()
    }

    // 播放/暂停
    playAction = () => {
        if (this.state.pause) {
            this.play()
        } else {
            this.stop()
        }
    }

    play = (val = this.state.currentTime) => {
        this.setState({
            pause: false,
            playBtn: require('../../../components/player/img/stop.png')
        }, () => {
            this.player.seek(val)
        })
    }

    stop = () => {
        this.setState({
            pause: true,
            playBtn: require('../../../components/player/img/play.png')
        })
    }

    render() {
        let { uri, name } = this.props
        return (
            <TouchableOpacity onPress={() => this.playAction()}>
                <Video source={{ uri: encodeURI(uri), mainVer: 1, patchVer: 0 }}
                    ref={(ref) => {
                        this.player = ref
                    }}
                    playInBackground
                    playWhenInactive
                    rate={1.0} // 0 is paused, 1 is normal.
                    volume={100.0} // 0 is muted, 1 is normal.
                    muted={false} // Mutes the audio entirely.
                    paused={this.state.pause} // Pauses playback entirely.
                    resizeMode='cover' // Fill the whole screen at aspect ratio.
                    onLoadStart={this.loadStart} // Callback when video starts to load
                    onLoad={this.setDuration} // Callback when video loads
                    onProgress={this.setTime} // Callback every ~250ms with currentTime
                    onEnd={this.onEnd} // Callback when playback finishes
                    onError={this.videoError} // Callback when video cannot be loaded
                />
                <View style={{ backgroundColor: 'white', borderRadius: 10, alignContent: 'center', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                    <Text style={{ margin: 10 }}>{name}</Text>
                    <Image source={this.state.playBtn} style={{ height: 30, width: 30, margin: 10 }} />
                </View>
            </TouchableOpacity>
        )
    }
}

export default PlayerBar
