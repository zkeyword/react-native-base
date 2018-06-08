import React from 'react'
import { connect } from 'react-redux'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import JoinTeam from '../joinTeam'
// import { CachedImage } from 'react-native-img-cache'

import styles from './style'

@connect(({ userInfo, auth }) => ({ ...userInfo, ...auth }))
class DrawerContent extends React.Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'userInfo/getUserInfo',
            payload: {
                access_token: this.props.accessToken
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={1} style={styles.header} onPress={Actions.userInfoSettings}>
                    <View style={styles.headerMain}>
                        <View style={styles.avatarBox}>
                            <View style={styles.avatarWrap}>
                                {
                                    <Image style={styles.avatar} source={require('../../assets/img/icon_user.png')} />
                                }
                            </View>
                            <View style={styles.userName}>
                                <Text style={styles.userNameText}>{this.props.userInfo.nickName}</Text>
                            </View>
                        </View>
                        <Text style={styles.userPhone}>{this.props.userInfo.phone}</Text>
                    </View>
                    <Image style={styles.headerBg} source={require('./img/header.png')} />
                </TouchableOpacity>
                <View style={styles.list}>
                    {/* <View style={styles.item}>
                        <View style={styles.itemIcon}>
                            <Image
                                source={require('./img/order.png')}
                                onPressIn={this.onClickView}
                            />
                        </View>
                        <Text style={styles.itemText} onPress={Actions.comingSoon}>我的订单</Text>
                    </View> */}
                    <View style={styles.item}>
                        <View style={styles.itemIcon}>
                            <Image
                                source={require('./img/down.png')}
                                onPressIn={this.onClickView}
                            />
                        </View>
                        <Text style={styles.itemText} onPress={Actions.comingSoon}>离线资源包</Text>
                    </View>
                    {/* <View style={styles.item}>
                        <View style={styles.itemIcon}>
                            <Image
                                source={require('./img/suggest.png')}
                                onPressIn={this.onClickView}
                            />
                        </View>
                        <Text style={styles.itemText} onPress={Actions.comingSoon}>意见反馈</Text>
                    </View> */}
                    <View style={styles.item}>
                        <View style={styles.itemIcon}>
                            <Image
                                source={require('./img/phone.png')}
                                onPressIn={this.onClickView}
                            />
                        </View>
                        <Text style={styles.itemText} onPress={Actions.comingSoon}>客服热线</Text>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.itemIcon}>
                            <Image
                                source={require('./img/setting.png')}
                                onPressIn={this.onClickView}
                            />
                        </View>
                        <Text style={styles.itemText} onPress={Actions.userSettings}>设置</Text>
                    </View>
                    {/* <View style={styles.item}>
                        <Text style={styles.itemText} onPress={() => this.onLogout()}>退出</Text>
                    </View> */}
                </View>
                <Image
                    style={styles.background}
                    source={require('./img/footer.png')}
                    resizeMode={Image.resizeMode.stretch}
                />
                <JoinTeam />
            </View>
        )
    }
}

export default DrawerContent
