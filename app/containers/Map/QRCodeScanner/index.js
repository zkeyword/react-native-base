import React, { Component } from 'react'
import { } from 'react-native'
import { Actions } from 'react-native-router-flux'

import QRCodeScanner from 'react-native-qrcode-scanner'
import styles from './style'

class ScanScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            torchMode: 'off',
            cameraType: 'back'
        }
    }

    onSuccess(e) {
        Actions.popAndPush('webView', { uri: e.data, title: '扫码结果' })
    }

    render() {
        return (
            <QRCodeScanner
                style={{ flex: 1 }}
                showMarker
                fadeIn={false}
                onRead={(e) => this.onSuccess(e)}
                cameraStyle={styles.cameraContainer}
                topViewStyle={styles.zeroContainer}
                bottomViewStyle={styles.zeroContainer}
            />
        )
    }
}

export default ScanScreen
