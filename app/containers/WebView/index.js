import React, { Component } from 'react'
import { WebView } from 'react-native'

class WebViewPage extends Component {
    render() {
        return (
            <WebView
                ref={ref => (this.webView = ref)}
                style={{ flex: 1 }}
                source={{ uri: this.props.uri }}
                injectedJavaScript={
                    `
                        document.getElementById('down').style.display = 'none'

                    `
                }
            />
        )
    }
}

export default WebViewPage
