import React, { Component } from 'react'
import { TouchableOpacity, Image, View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

@connect(({ landMark }) => ({ ...landMark }))
class BusinessInfoWindow extends Component {
    findShortRoute = (landmarkId, windowInfo) => {
        let { dispatch, userLocation } = this.props
        if (landmarkId !== null & userLocation != null) {
            dispatch({
                type: 'landMark/getShortRoute',
                payload: {
                    longitude: userLocation.longitude,
                    latitude: userLocation.latitude,
                    landmarkId: landmarkId
                }
            })
        }
    }

    render() {
        let { windowInfo, closeInfoWindow } = this.props
        return (
            <View style={{ borderRadius: 4, overflow: 'hidden', elevation: 2 }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#2789FD', justifyContent: 'space-between', height: 35 }}>
                    <Text style={{ color: 'white', fontSize: 12, marginLeft: 15, alignSelf: 'center' }}>{windowInfo.name}</Text>
                    <TouchableOpacity style={{ justifyContent: 'center' }} onPress={closeInfoWindow}>
                        <Ionicons name='ios-close' style={{ fontSize: 25, color: '#fff', alignSelf: 'center', marginRight: 10, textAlign: 'center' }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: 'white', opacity: 0.8 }}>
                    <Image style={{ height: 72, width: 105, margin: 12 }}
                        source={{ uri: windowInfo.pictures[0] }} />
                    <View style={{ width: 120, height: 75, marginRight: 12, marginTop: 10, marginBottom: 12, justifyContent: 'space-around' }}>
                        <Text style={{ fontSize: 10, opacity: 1, height: 52 }} numberOfLines={3} >{windowInfo.intro}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                            {
                                windowInfo.type !== 'SCENIC' ? (null)
                                    : (<TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#2d94fd', padding: 4, borderRadius: 3 }}
                                        onPress={() => Actions.POIDetail({ intro: windowInfo.intro, voices: windowInfo.voices, title: windowInfo.name, pictures: windowInfo.pictures })}>
                                        <Image source={require('./img/map_btn_mid-pop-list_detail.png')} style={{ marginTop: 1, marginLeft: 4 }} />
                                        <Text style={{ fontSize: 9, color: 'white', marginLeft: 7, marginRight: 6 }}>详细</Text>
                                    </TouchableOpacity>)
                            }
                            <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#2d94fd', padding: 4, borderRadius: 3 }}
                                onPress={() => this.findShortRoute(windowInfo.id, windowInfo)}>
                                <Image source={require('./img/map_btn_mid-pop-list_map-navigation.png')} style={{ marginTop: 1, marginLeft: 4 }} />
                                <Text style={{ fontSize: 9, color: 'white', marginLeft: 7, marginRight: 6 }}>导航</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default BusinessInfoWindow
