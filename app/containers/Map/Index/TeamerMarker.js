import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import { Marker } from 'dynamax-react-native-amap'
import { connect } from 'react-redux'

@connect(({ teams }) => ({ ...teams }))
class TeamerMarker extends Component {
    shouldComponentUpdate() {
        let data = this.props.menbersLocation
        if (Object.values(data).length) return true
        return false
    }

    render() {
        let data = this.props.menbersLocation

        return Object.values(data).map((item, index) => {
            let obj = { latitude: Number(item.location.latitude), longitude: Number(item.location.longitude) }
            return (
                <Marker
                    key={index}
                    // active
                    icon={() =>
                        <View style={{ alignItems: 'center', backgroundColor: 'transparent' }}>
                            <View style={{overflow: 'hidden', borderRadius: 30}}>
                                <Image source={item.avatar ? { uri: item.avatar } : require('../../../assets/img/icon_user.png')} style={{ width: 30, height: 30 }} />
                            </View>
                            <View style={{ backgroundColor: 'white', marginTop: 5, marginBottom: 5, paddingLeft: 8, paddingRight: 8, paddingTop: 1, paddingBottom: 1, borderRadius: 15, opacity: 0.8 }}>
                                <Text style={{ backgroundColor: 'transparent', fontSize: 10 }}> {item.userName ? item.userName : '未知名字'}</Text>
                            </View>
                        </View>
                    }
                    // onDragEnd={this._onDragEvent}
                    // onInfoWindowPress={this._onInfoWindowPress}
                    coordinate={{ ...obj }}
                />
            )
        })
    }
}

export default TeamerMarker
