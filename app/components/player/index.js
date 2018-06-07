import React, { Component } from 'react'
import { TouchableOpacity, View, Image, Slider } from 'react-native'
import Video from 'react-native-video'
import Loading from '../../components/Loading'
import styles from './style'

class Player extends Component {
    state = {
        sliderValue: 0,
        duration: 0,
        currentTime: 0.0,
        pause: true,
        playBtn: require('./img/play.png'),
        isLoding: false,
        isShowLoding: false
    }

    loadStart = (data) => {
        this.setState({
            isLoding: true
        })
    }

    setTime = (data) => {
        let val = parseInt(data.currentTime)
        this.setState({
            sliderValue: val,
            currentTime: data.currentTime
        })
    }

    setDuration = (data) => {
        this.setState({
            duration: data.duration,
            isLoding: false
        })
    }

    onEnd = () => { }

    videoError = () => { }

    // 播放/暂停
    playAction = () => {
        if (this.state.isLoding) {
            this.setState({
                isShowLoding: true
            })
        }
        if (this.state.pause) {
            this.play()
        } else {
            this.stop()
        }
    }

    play = (val = this.state.currentTime) => {
        this.setState({
            pause: false,
            playBtn: require('./img/stop.png')
        }, () => {
            this.player.seek(val)
        })
    }

    stop = () => {
        this.setState({
            pause: true,
            playBtn: require('./img/play.png')
        })
    }

    render() {
        let { uri } = this.props
        return (
            <View style={styles.container}>
                <Video source={{ uri, mainVer: 1, patchVer: 0 }}
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
                    // repeat // Repeat forever.
                    onLoadStart={this.loadStart} // Callback when video starts to load
                    onLoad={this.setDuration} // Callback when video loads
                    onProgress={this.setTime} // Callback every ~250ms with currentTime
                    onEnd={this.onEnd} // Callback when playback finishes
                    onError={this.videoError} // Callback when video cannot be loaded
                />
                <View style={styles.main}>
                    <TouchableOpacity style={styles.left} onPress={() => this.playAction()}>
                        <Image source={this.state.playBtn} style={{ width: '100%', height: '100%' }} />
                    </TouchableOpacity>
                    <View style={styles.right}>
                        <Slider
                            style={styles.rightSlider}
                            ref='slider'
                            value={this.state.sliderValue}
                            maximumValue={this.state.duration}
                            step={1}
                            minimumTrackTintColor='#2d94fd'
                            maximumTrackTintColor='#ddd'
                            thumbTintColor='#2d94fd'
                            onValueChange={(value) => {
                                this.setState({
                                    pause: true,
                                    currentTime: value
                                })
                            }}
                            onSlidingComplete={(value) => this.play(value)}
                        />
                        <View style={styles.rightBackground} />
                    </View>
                    {
                        this.state.isLoding && this.state.isShowLoding && (
                            <View style={styles.loadingWrap}>
                                <Loading style={styles.loading} />
                            </View>
                        )
                    }
                </View>
            </View>
        )
    }
}
export default Player
