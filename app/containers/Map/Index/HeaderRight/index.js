import React, { Component } from 'react'
import { Dimensions, View, Image, Text, TouchableOpacity } from 'react-native'
import { Menu, Theme, Drawer } from 'teaset'
import Modal from '../../../../components/model'
import HeaderRight from '../../../../components/headerRight'
import styles from './style'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import * as WeChat from 'react-native-wechat'
import * as QQAPI from 'react-native-qq'

@connect(({ audioType }) => ({ ...audioType }))
class CustomHeaderRight extends Component {
    state = {
        isShow: false,
        drawer: null,
        audioType: 'WOMEN'
    }

    shareMsg = {
        type: 'news',
        title: '登高望远，荔海听涛，欢迎大家使用荔枝海APP一同品味荔枝文化！',
        description: '景区资讯，地图导航，位置共享，语音讲解，荔枝智慧景区APP带给你不一样的游玩体验！',
        webpageUrl: 'http://static.dynatravel.cn/litchi-sea-mobile-share'
    }

    componentDidMount() {
        this.setState({
            audioType: this.props.audioType
        })
    }

    // 右侧下拉
    onPressHeaderRight = () => {
        Theme.set({
            menuColor: '#ffffff',
            menuShadowColor: '#333',
            menuItemColor: '#ffffff',
            menuItemTitleColor: '#4d4d4d',
            menuItemSeparatorColor: '#f4f4f4'
        })
        let ScreenWidth = Dimensions.get('window').width
        let items = [
            { title: '语音类别', icon: require('./img/map_img_top-pop-list_voice-choice.png'), onPress: () => this.onClose() },
            { title: '分享', icon: require('./img/map_img_top-pop-list_share.png'), onPress: () => this.onShareAction() },
            { title: '扫码', icon: require('./img/icon_qrscan.png'), onPress: () => this.onQRCodeScan() }
        ]
        Menu.show({ x: ScreenWidth, y: 64, width: 0, height: 0 }, items, {
            align: 'end',
            showArrow: true,
            alignInsets: -10
        })
    }

    onQRCodeScan = () => {
        Actions.scanScreen()
    }

    // 声音弹窗
    onClose = () => {
        this.setState({
            isShow: !this.state.isShow,
            audioType: this.props.audioType
        })
    }

    setAudio = (audioType) => {
        if (!audioType) {
            this.props.dispatch({
                type: 'audioType/set',
                payload: {
                    audioType: this.state.audioType
                }
            })
            this.setState({
                isShow: false
            })
        } else {
            this.setState({
                audioType
            })
        }
    }

    // 分享
    onTimelineShare = () => {
        try {
            WeChat.shareToTimeline(this.shareMsg)
        } catch (e) {
            if (e instanceof WeChat.WechatError) {
                console.error(e.stack)
            } else {
                throw e
            }
        }
    }

    onSessionShare = () => {
        try {
            WeChat.shareToSession(this.shareMsg)
        } catch (e) {
            if (e instanceof WeChat.WechatError) {
                console.error(e.stack)
            } else {
                throw e
            }
        }
    }

    onQQShare = () => {
        try {
            QQAPI.shareToQQ(this.shareMsg)
        } catch (e) {

        }
    }

    onQzoneShare = () => {
        QQAPI.shareToQzone(this.shareMsg)
    }

    onShareAction = () => {
        let view = (
            <View style={styles.shareWrap}>
                <View style={styles.shareTitle}>
                    <Text style={styles.shareTitleText}>分享到</Text>
                </View>
                <View style={styles.shareItemWrap}>
                    <TouchableOpacity onPress={() => this.onSessionShare()} style={styles.shareItem} activeOpacity={0.9}>
                        <Image style={styles.shareItemImg} source={require('./img/btn_wechat-friend.png')} />
                        <Text>微信好友</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onTimelineShare()} style={styles.shareItem} activeOpacity={0.9}>
                        <Image style={styles.shareItemImg} source={require('./img/btn_wechat-moments.png')} />
                        <Text>微信朋友圈</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onQQShare()} style={styles.shareItem} activeOpacity={0.9}>
                        <Image style={styles.shareItemImg} source={require('./img/btn_qqfriend.png')} />
                        <Text>QQ好友</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onQzoneShare()} style={styles.shareItem} activeOpacity={0.9}>
                        <Image style={styles.shareItemImg} source={require('./img/btn_qzone.png')} />
                        <Text>QQ空间</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => this.state.drawer.close()} style={styles.shareBtnWrap} activeOpacity={0.9}>
                    <Text style={styles.shareBtnText}>取消</Text>
                </TouchableOpacity>
            </View >
        )
        this.setState({
            drawer: Drawer.open(view, 'bottom')
        })
    }

    render() {
        let { audioType } = this.state
        let itemTextColor = isSelected => {
            return isSelected ? [styles.itemText, styles.itemTextSelect] : styles.itemText
        }
        return (
            <View>
                <HeaderRight onPressHeaderRight={() => this.onPressHeaderRight()} />
                <Modal
                    icon={<Image style={{ marginLeft: 10 }} source={require('./img/map_img_mid-pop-list_title-voice.png')} />}
                    title={'语音选择'}
                    onClose={this.onClose}
                    visible={this.state.isShow}
                    botton={[
                        {
                            text: '取消',
                            color: '#bababa',
                            callback: () => this.onClose()
                        },
                        {
                            text: '确定',
                            callback: () => this.setAudio()
                        }
                    ]}
                    content={
                        <View style={{ flex: 1, paddingHorizontal: 10 }}>
                            <TouchableOpacity style={[styles.item, styles.itemFirst]} onPress={() => this.setAudio('WOMEN')}>
                                <View style={styles.itemLeft}>
                                    {
                                        audioType === 'WOMEN'
                                            ? <Image source={require('./img/map_img_mid-pop-list_male_selected.png')} />
                                            : <Image source={require('./img/map_img_mid-pop-list_male_normal.png')} />
                                    }
                                    <Text style={itemTextColor(audioType === 'WOMEN')}>靓丽女声</Text>
                                </View>
                                {
                                    audioType === 'WOMEN' && <Image source={require('./img/map_img_mid-pop-list_selected.png')} />
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item} onPress={() => this.setAudio('MAN')}>
                                <View style={styles.itemLeft}>
                                    {
                                        audioType === 'MAN'
                                            ? <Image source={require('./img/map_img_mid-pop-list_male_selected.png')} />
                                            : <Image source={require('./img/map_img_mid-pop-list_male_normal.png')} />
                                    }
                                    <Text style={itemTextColor(audioType === 'MAN')}>绅士男声</Text>
                                </View>
                                {
                                    audioType === 'MAN' && <Image source={require('./img/map_img_mid-pop-list_selected.png')} />
                                }
                            </TouchableOpacity>
                        </View>
                    }
                />
            </View>
        )
    }
}

export default CustomHeaderRight
