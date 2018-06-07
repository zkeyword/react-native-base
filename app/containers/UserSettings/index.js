import React, { Component } from 'react'
import { Text, ScrollView, View, Switch, TouchableOpacity, Alert, Linking, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import deviceInfo from 'react-native-device-info'
import update from 'react-native-app-update-for-android'

@connect(({ userInfo, auth, vercheck }) => ({ ...userInfo, ...auth, ...vercheck }))
class UserSettings extends Component {
    state = {
        switchOrNot: false
    }

    onValueChange = (e) => {
        this.setState({
            switchOrNot: !this.state.switchOrNot
        })
    }

    onLogout = () => {
        this.props.dispatch({
            type: 'auth/removeToken'
        })
    }

    onModifyPwd = () => {
        Actions.modifyPwd()
    }

    onVerCheck = () => {
        this.props.dispatch({
            type: 'vercheck/get'
        })
    }

    onUpdate = () => {
        if (Platform.OS === 'ios') {
            Linking.canOpenURL('https://itunes.apple.com/cn/app/%E5%BE%AE%E4%BF%A1/id414478124?mt=8').then(supported => {
                if (supported) {
                    Linking.openURL('https://itunes.apple.com/cn/app/%E5%BE%AE%E4%BF%A1/id414478124?mt=8')
                } else {
                }
            })
        } else {
            update.downloadApp(`http://dynamax-apps.oss-cn-shenzhen.aliyuncs.com/android/litchi-sea/litchi-sea-${this.props.newVersion}.apk`)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.foundNewVersion) {
            Alert.alert('检查更新', `发现最新版本v${nextProps.newVersion}`,
                [
                    { text: '取消' },
                    { text: '更新', onPress: () => this.onUpdate() }
                ]
            )
            this.props.dispatch(
                {
                    type: 'vercheck/reset'
                }
            )
        }
    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: '#f4f4f4' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', marginVertical: 5 }}>
                    <Text style={{ marginLeft: 15, marginVertical: 10 }}>账户 </Text>
                    <Text style={{ marginRight: 15, marginVertical: 10 }}>{this.props.userInfo.nickName} </Text>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', marginVertical: 5 }} onPress={() => this.onModifyPwd()}>
                    <Text style={{ marginLeft: 15, marginVertical: 10 }}>修改密码 </Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', marginVertical: 5 }}>
                    <Text style={{ marginLeft: 15, marginVertical: 10 }}>景区公告 </Text>
                    <Switch style={{ marginRight: 15, marginVertical: 10 }} value={this.state.switchOrNot} onValueChange={(e) => this.onValueChange(e)} />
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', marginVertical: 5 }}
                    onPress={() => this.onVerCheck()}>
                    <Text style={{ marginLeft: 15, marginVertical: 10 }}>检测版本 </Text>
                    <Text style={{ marginRight: 15, marginVertical: 10 }}>v{deviceInfo.getVersion()}</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', marginVertical: 5 }}>
                    <Text style={{ marginLeft: 15, marginVertical: 10 }}>清除缓存 </Text>
                    <Text style={{ marginRight: 15, marginVertical: 10 }}>0MB </Text>
                </View>
                <TouchableOpacity style={{ backgroundColor: '#14BBFD', borderRadius: 15, marginHorizontal: 15, overflow: 'hidden', marginTop: 30 }} onPress={() => this.onLogout()}>
                    <Text style={{ textAlign: 'center', margin: 10, color: 'white' }}>退出</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

export default UserSettings
