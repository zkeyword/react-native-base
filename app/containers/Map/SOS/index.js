import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Linking, Platform } from 'react-native'
import { connect } from 'react-redux'

import styles from './style'
import Modal from '../../../components/model'

@connect(({ map }) => ({ ...map }))
class SOS extends Component {
    state = {
        isShow: false
    }

    onClose = () => {
        this.setState({
            isShow: !this.state.isShow
        })
    }

    renderModelContent = () => {
        return (
            <View>
                <View style={styles.modelAddress}>
                    <Text>景区地址：</Text>
                </View>
            </View>
        )
    }

    callMe = sosPhones => {
        let phone = `tel${Platform.OS === 'android' ? '' : 'prompt'}://${sosPhones}`
        return Linking.openURL(phone)
    }

    render() {
        let { scenicsData } = this.props
        return (
            <View>
                <TouchableOpacity onPress={() => this.onClose()}>
                    <Image source={require('./img/map_btn_sos_normal.png')} />
                </TouchableOpacity>
                {scenicsData && (
                    <Modal
                        onClose={this.onClose}
                        visible={this.state.isShow}
                        botton={[
                            {
                                text: '取消',
                                color: '#bababa',
                                callback: () => this.onClose()
                            },
                            {
                                text: '拨打',
                                callback: () => this.callMe(scenicsData.sosPhones)
                            }
                        ]}
                        content={
                            <View style={{ flex: 1 }}>
                                <View style={{ backgroundColor: '#2789FD', flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={{ margin: 10 }} source={require('./img/map_img_mid-pop-list_title-sos.png')} />
                                    <Text style={{ color: 'white', fontSize: 14 }}>SOS求助</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image style={{ margin: 10 }} source={require('./img/map_img_mid-pop-list_phone_normal.png')} />
                                        <Text style={{ color: 'black', fontSize: 11 }}>荔枝海管理处</Text>
                                    </View>
                                    <Text style={{ color: '#c4c4c4', fontSize: 11, marginRight: 15 }}>{scenicsData.sosPhones}</Text>
                                </View>
                            </View>
                        }
                    />
                )}
            </View>
        )
    }
}

export default SOS
