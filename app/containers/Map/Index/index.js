import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { MapView, Utils } from 'dynamax-react-native-amap'
import { Actions } from 'react-native-router-flux'

import HeaderLeft from '../../../components/headerLeft'

import POISearchToolBar from '../POISearchToolBar'
import SOS from '../SOS'
import Location from '../Location'
import Route from '../Route'
import Team from '../Team'
import Audio from '../Audio'
import Marker from './Marker'
import GroundOverlay from './GroundOverlay'
import Polyline from './Polyline'
import HeaderRight from './HeaderRight'
import HeaderTitle from './HeaderTitle'
import TeamerMarker from './TeamerMarker'
import HitPointPlayer from '../HitPointPlayer'

@connect(({ landMark, teams, userInfo, hitpointplay, audioType }) => ({ ...landMark, ...teams, ...userInfo, ...hitpointplay, ...audioType }))
class Home extends Component {
    static navigationOptions = {
        headerTitle: <HeaderTitle title={'漳州荔枝海公园'} />,
        HeaderLeft: <HeaderLeft />,
        headerRight: <HeaderRight />,
        tabBarLabel: '首页'
    }

    state = {
        uri: '',
        name: ''
    }

    onLcoation = async nativeEvent => {
        let userLocation = { latitude: nativeEvent.latitude, longitude: nativeEvent.longitude }
        this.props.dispatch({
            type: 'landMark/setState',
            payload: {
                userLocation
            }
        })
        if (this.props.menberInfo && this.props.menberInfo.token && this.props.userInfo && Actions.currentScene === 'map') {
            this.props.dispatch({
                type: 'teams/putMemberLocation',
                payload: {
                    userName: this.props.userInfo.account,
                    token: this.props.menberInfo.token,
                    userId: this.props.userInfo.id,
                    online: true,
                    location: userLocation
                }
            })
        }
        if (this.props.isAuto) {
            this.props.POIArr.forEach(async(item, index) => {
                let distance = await Utils.distance(Number(nativeEvent.latitude), Number(nativeEvent.longitude), Number(item.location.latitude), Number(item.location.longitude))
                if (distance > 0 && distance < 50) {
                    let uri
                    item.voices.forEach((value, i) => {
                        if (value.type === this.props.audioType) {
                            uri = value.src
                        }
                    })
                    this.setState({
                        uri: uri,
                        name: item.name
                    })
                }
            })
        }
    }

    onEnd = () => {
        this.setState({
            uri: '',
            name: ''
        })
    }

    renderRegion = () => {
        // if (!__DEV__) {
        return {
            // latitude: (24.474807 - 24.462063) / 2 + 24.462063,
            latitude: (24.479000 - 24.462063) / 2 + 24.462063,
            longitude: (117.648575 - 117.624655) / 2 + 117.624655,
            // latitudeDelta: (24.474807 - 24.462063),
            latitudeDelta: (24.479000 - 24.462063),
            longitudeDelta: (117.648575 - 117.624655)
        }
        // } else {
        //     return null
        // }
    }

    renderLimiteRegion = () => {
        // if (!__DEV__) {
        return {
            // latitude: (24.474807 - 24.462063) / 2 + 24.462063,
            latitude: (24.479000 - 24.462063) / 2 + 24.462063,
            longitude: (117.648575 - 117.624655) / 2 + 117.624655,
            // latitudeDelta: (24.474807 - 24.462063),
            latitudeDelta: (24.479000 - 24.462063),
            longitudeDelta: (117.648575 - 117.624655)
        }
        // } else {
        //     return null
        // }
    }

    render() {
        var playBar
        if (this.state.uri) {
            playBar = (<View style={{ position: 'absolute', bottom: 65, right: 5 }}>
                <HitPointPlayer uri={this.state.uri} name={this.state.name} onEnd={() => this.onEnd()} />
            </View>)
        } else {
            playBar = null
        }
        return (
            <View style={StyleSheet.absoluteFill}>
                <MapView style={StyleSheet.absoluteFill}
                    ref={ref => (this.mapView = ref)}
                    minZoomLevel={15}
                    maxZoomLevel={17}
                    zoomLevel={15}
                    showsZoomControls={false}
                    rotateEnabled={false}
                    tiltEnabled={false}
                    zoomEnabled
                    locationEnabled
                    locationInterval={10000}
                    distanceFilter={10}
                    onLocation={({ nativeEvent }) => this.onLcoation(nativeEvent)}
                    showsBuildings={false}
                    showsCompass={false}
                    region={this.renderRegion()}
                    limitRegion={this.renderLimiteRegion()}
                >
                    <GroundOverlay />
                    <Polyline mapView={this.mapView} />
                    <Marker />
                    <TeamerMarker />
                </MapView>
                <View style={{ alignSelf: 'flex-end' }}>
                    <Route />
                    <Team />
                    <Audio />
                </View>
                <View style={{ position: 'absolute', bottom: 60, left: 5 }}>
                    <SOS />
                    <Location
                        mapView={this.mapView}
                    />
                </View>
                {
                    playBar
                }
                <POISearchToolBar currentLandmarkType={this.props.currentLandmarkType} mapView={this.mapView} />
            </View>
        )
    }
}

export default Home
