import React, { Component } from 'react'
import { Polyline } from 'dynamax-react-native-amap'
import { connect } from 'react-redux'

@connect(({ landMark }) => ({ ...landMark }))
class CustomPolyline extends Component {
    state = {
        centerPoint: null
    }

    shouldComponentUpdate() {
        // 获取完数据不再渲染
        if (this.props.isRenderNavigator) {
            this.props.dispatch({ type: 'landMark/resetIsRenderNavigator' })
            return true
        }
        return false
    }

    componentWillReceiveProps() {
        this.setState({
            centerPoint: this.getCenterPoint(this.getCoordinates())
        })
    }

    onAddPolyline = (coordinate) => {
        var lat = Number(coordinate.latitude)
        var lng = Number(coordinate.longitude)

        this.props.mapView.animateTo({
            coordinate: {
                latitude: lat,
                longitude: lng
            }
        }, Number(200), false)
    }

    moveToCenterPoint = (coordinate) => {
        var isSame = this.state.centerPoint && (coordinate.latitude === this.state.centerPoint.latitude) && (coordinate.longitude === this.state.centerPoint.longitude)
        if (!isSame && coordinate.latitude < 24.479000 && coordinate.latitude > 24.462063 && coordinate.longitude < 117.648575 && coordinate.longitude > 117.624655) {
            // if (!isSame && coordinate.latitude < 24.474807 && coordinate.latitude > 24.462063 && coordinate.longitude < 117.648575 && coordinate.longitude > 117.624655) {
            this.onAddPolyline(coordinate)
        }
    }

    getCenterPoint = (coordinates) => {
        if (!coordinates) return
        var minLat = 90
        var maxLat = -90
        var minLng = 180
        var maxLng = -180

        for (const item of coordinates) {
            if (item.latitude < minLat) {
                minLat = item.latitude
            }

            if (item.latitude > maxLat) {
                maxLat = item.latitude
            }

            if (item.longitude < minLng) {
                minLng = item.longitude
            }

            if (item.longitude > maxLng) {
                maxLng = item.longitude
            }
        }

        var coordinate = {
            latitude: (minLat + maxLat) / 2,
            longitude: (minLng + maxLng) / 2
        }

        return coordinate
    }

    getCoordinates = () => {
        let coordinates = this.props.isNavigator ? this.props.shortRouteArr : this.props.routeInfo.coordinates
        if (!coordinates) return null

        coordinates = coordinates.map(item => {
            return {
                latitude: Number(item.latitude),
                longitude: Number(item.longitude)
            }
        })
        return coordinates
    }

    render() {
        let coordinates = this.getCoordinates()
        if (!coordinates) return null
        this.moveToCenterPoint(this.getCenterPoint(coordinates))
        return (
            <Polyline
                width={5}
                color='rgba(255, 0, 0, 0.5)'
                coordinates={coordinates} />
        )
    }
}

export default CustomPolyline
