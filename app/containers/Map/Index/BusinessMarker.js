import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import { Marker } from 'dynamax-react-native-amap'
import BusinessInfoWindow from './BusinessInfoWindow'

class BusinessMarker extends Component {
    render() {
        let { markerInfo, coordinate } = this.props
        // 动态设置宽度,不是很好的实现方式，后期看是否能优化
        var length = 0
        if (markerInfo.name !== null) {
            length = markerInfo.name.replace(/[\u0391-\uFFE5]/g, 'aa').length * 5 + 26
        }

        if (length < 36) {
            length = 36
        }

        return <Marker
            active={false}
            children={(map) => <BusinessInfoWindow closeInfoWindow={() => map.active(false)} windowInfo={markerInfo} />}
            icon={() =>
                <View style={{ width: length, alignItems: 'center', flexWrap: 'wrap', backgroundColor: 'transparent', justifyContent: 'center' }}>
                    <View style={{ backgroundColor: 'white', marginTop: 5, marginBottom: 5, paddingLeft: 8, paddingRight: 8, paddingTop: 1, paddingBottom: 1, borderRadius: 15, opacity: 0.8 }}>
                        <Text style={{ backgroundColor: 'transparent', fontSize: 10 }}> {markerInfo.name}</Text>
                    </View>
                    <Image source={this.props.image} />
                </View>
            }
            onDragEnd={this._onDragEvent}
            onInfoWindowPress={this._onInfoWindowPress}
            coordinate={{ ...coordinate }}
        />
    }
}

export default BusinessMarker
