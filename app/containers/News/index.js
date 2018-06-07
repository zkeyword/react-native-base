import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import HeaderLeft from '../../components/headerLeft'
import HeaderRight from '../../components/headerRight'
import { MapView } from 'dynamax-react-native-amap'

@connect(({ auth }) => ({ ...auth }))
class Map extends Component {
    static navigationOptions = {
        headerTitle: '漳州荔枝海公园',
        HeaderLeft: <HeaderLeft />,
        headerRight: <HeaderRight />,
        tabBarLabel: '首页'
    }

    state = {
        text: '1212'
    }

    gotoDetail = () => {
    }

    test = () => {
        this.setState({
            text: 'x'
        })
    }

    render() {
        return (
            <MapView style={StyleSheet.absoluteFill}
                locationEnabled
                zoomLevel={8}
                showsBuildings={false}
                showsCompass={false}
                limitRegion={{
                    latitude: (24.479000 - 24.462063) / 2 + 24.462063,
                    // latitude: (24.474807 - 24.462063) / 2 + 24.462063,
                    longitude: (117.648575 - 117.624655) / 2 + 117.624655,
                    // latitudeDelta: (24.474807 - 24.462063),
                    latitudeDelta: (24.479000 - 24.462063),
                    longitudeDelta: (117.648575 - 117.624655)
                }}>
                {/* <GroundOverlay
                    icon={require('./img/park_map.jpg')}
                    coordinateBounds={{
                        northEast: { latitude: 24.462063, longitude: 117.624655 },
                        southWest: { latitude: 24.479000, longitude: 117.648575 }
                        southWest: { latitude: 24.474807, longitude: 117.648575 }
                    }}
                /> */}
            </MapView>
        )
    }
}

export default Map
