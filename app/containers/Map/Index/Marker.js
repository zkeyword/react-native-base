import React, { Component } from 'react'
import BusinessMarker from './BusinessMarker'
import { connect } from 'react-redux'

@connect(({ landMark }) => ({ ...landMark }))
class CustomMarker extends Component {
    shouldComponentUpdate() {
        // 获取完数据不再渲染
        if (this.props.isRenderPOIArr) {
            this.props.dispatch({ type: 'landMark/resetIsRenderPOIArr' })
            return true
        }
        return false
    }

    render() {
        let data = this.props.POIArr
        return data.map((item, index) => {
            var lat = Number(item.location.latitude)
            var lng = Number(item.location.longitude)
            let object = { latitude: lat, longitude: lng }
            var iconImage
            switch (item.type) {
                case 'SCENIC':
                    iconImage = require('./img/map_spots_scenic.png')
                    break
                case 'FOOD':
                    iconImage = require('./img/map_spots_shop.png')
                    break
                case 'GUEST_CENTER':
                    iconImage = require('./img/map_spots_visitorcenter.png')
                    break
                case 'TOILET':
                    iconImage = require('./img/map_spots_toilet.png')
                    break
                case 'GATEWAY':
                    iconImage = require('./img/map_spots_passageway.png')
                    break
                case 'BUS_STATION':
                    iconImage = require('./img/map_spots_bus.png')
                    break
                case 'CHAIR':
                    iconImage = require('./img/map_spots_chair.png')
                    break
                case 'OTHER':
                    iconImage = require('./img/map_spots_other.png')
                    break
                default:
                    break
            }

            return <BusinessMarker coordinate={object} image={iconImage} key={index} markerInfo={item} />
        })
    }
}

export default CustomMarker
