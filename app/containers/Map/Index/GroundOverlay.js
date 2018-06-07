import React, { Component } from 'react'
import { Platform } from 'react-native'
import { GroundOverlay } from 'dynamax-react-native-amap'
import { requireImage } from '../../../utils/imageNameRequire'
import resolveAssetSource from 'resolveAssetSource'

class CustomGroundOverlay extends Component {
    state = {
        isRender: true
    }

    shouldComponentUpdate() {
        if (this.state.isRender) {
            this.setState({
                isRender: false
            })
            return true
        }
        return false
    }

    render() {
        var source = require('./img/park_map.jpg')
        if (Platform.OS === 'android') {
            var uniformValue = resolveAssetSource(source)
            if (__DEV__) {
                source = requireImage(uniformValue.uri)
            } else {
                source = uniformValue.uri
            }
        }

        return (
            <GroundOverlay
                icon={source}
                coordinateBounds={{
                    northEast: { latitude: 24.462063, longitude: 117.624655 },
                    // southWest: { latitude: 24.474807, longitude: 117.648575 }
                    southWest: { latitude: 24.479000, longitude: 117.648575 }
                }}
            />)
    }
}

export default CustomGroundOverlay
