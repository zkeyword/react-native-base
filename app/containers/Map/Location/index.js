import React, { Component } from 'react'
import { TouchableOpacity, Image, PermissionsAndroid } from 'react-native'
import { connect } from 'react-redux'

@connect(({ landMark }) => ({ ...landMark }))
class Location extends Component {
    constructor(props) {
        super(props)
        this.requestCameraPermission()
    }

    requestCameraPermission = async() => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('现在你获得定位权限')
            } else {
                console.log('用户并不屌你')
            }
        } catch (err) {
            console.warn(err)
        }
    }

    onLocationBtnPress = () => {
        let { mapView, userLocation } = this.props
        this.requestCameraPermission()
        mapView.animateTo({
            coordinate: {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude
            }
        }, Number(200), false)
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.onLocationBtnPress()}>
                <Image source={require('./img/map_btn_location_normal.png')} />
            </TouchableOpacity>
        )
    }
}

export default Location
