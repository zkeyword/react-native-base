import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, Image, Clipboard, Linking } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Drawer, Overlay, Label, Wheel } from 'teaset'
import { CachedImage } from 'react-native-img-cache'

import { format } from '../../../utils/time'
import Loading from '../../../components/Loading'
import styles from './style'

@connect(({ teams, userInfo }) => ({ ...teams, ...userInfo }))
class TeamSettings extends Component {
    state = {
        isRemoveMenber: false,
        drawer: null,
        wheelValue: null,
        memberNum: null,
        autoDestroyTime: null
    }

    memberNum = ['2人', '3人', '4人', '5人', '6人', '7人', '8人', '9人', '10人']
    autoDestroyTime = ['2天', '3天', '4天', '5天', '6天', '7天', '8天']

    setClipboardContent = async(token) => {
        Clipboard.setString('#荔枝海组队口令#长按复制这条信息后，打开荔枝海即可加入队伍，或在组队功能中，输入队伍口令【' + token + '】')
        try {
            let token = await Clipboard.getString()
            this.setState({ token })
        } catch (e) {
            this.setState({ token: e.message })
        }
    }

    onShareAction = (token) => {
        this.setClipboardContent(token)
        let view = (
            <View style={styles.shareWrap}>
                <View style={styles.shareTitle}>
                    <Text style={styles.shareTitleText}>荔枝海组队口令已生成</Text>
                    <Text style={styles.shareSubTitleText}>邀请小伙伴共享位置</Text>
                </View>
                <View style={styles.shareItemWrap}>
                    <TouchableOpacity onPress={() => this.onSessionShare()} style={styles.shareItem} activeOpacity={0.9}>
                        <Image style={styles.shareItemImg} source={require('./img/btn_wechat-friend.png')} />
                        <Text>微信</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onQQShare()} style={styles.shareItem} activeOpacity={0.9}>
                        <Image style={styles.shareItemImg} source={require('./img/btn_qqfriend.png')} />
                        <Text>QQ</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => this.state.drawer.close()} style={styles.shareBtnWrap} activeOpacity={0.9}>
                    <Text style={styles.shareBtnText}>取消</Text>
                </TouchableOpacity>
            </View>
        )
        this.setState({
            drawer: Drawer.open(view, 'bottom')
        })
    }

    onCloseOverlay = () => {
        this.overlayView && this.overlayView.close()
    }

    onShowOverlay = (type) => {
        let overlayView = (
            <Overlay.PopView
                style={{ alignItems: 'center', justifyContent: 'center' }}
                modal
                overlayOpacity={0.5}
                ref={ref => (this.overlayView = ref)}
            >
                <View style={{ backgroundColor: 'white', marginHorizontal: 30, borderRadius: 10, alignItems: 'center' }}>
                    <Label style={{ color: 'black', marginVertical: 10 }} size='lg' text='组队口令已复制' />
                    <Label style={{ color: '#4e4e4e', marginHorizontal: 15, borderWidth: 1, borderColor: '#ddd', padding: 10 }} numberOfLines={0} size='md'
                        text='#荔枝海组队口令#长按复制这条信息后，打开手机荔枝海地图就能加入队伍，或在组队功能中，输入队伍口令也可以完成加入。' />
                    <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#ddd', marginTop: 10 }}>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', borderRightWidth: 1, borderRightColor: '#ddd' }} onPress={() => this.onCloseOverlay()}>
                            <Text style={{ padding: 15, color: '#969699' }}>取消</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => this.onOpenURL(type)}>
                            <Text style={{ padding: 15, color: '#2d94fd' }}>去粘贴</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Overlay.PopView>
        )
        Overlay.show(overlayView)
    }

    onConfirmQuitTeam = (id, isLeader, userId) => {
        let overlayView = (
            <Overlay.PopView
                style={{ alignItems: 'center', justifyContent: 'center' }}
                modal
                overlayOpacity={0.5}
                ref={ref => (this.overlayView = ref)}
            >
                <View style={{ backgroundColor: 'white', marginHorizontal: 30, borderRadius: 10, alignItems: 'center', width: 300 }}>
                    <Label style={{ color: '#4e4e4e', padding: 15 }} numberOfLines={0} size='md' text={isLeader ? '确认解散队伍?' : '确认离开队伍?'} />
                    <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#ddd', marginTop: 10 }}>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', borderRightWidth: 1, borderRightColor: '#ddd' }} onPress={() => this.onCloseOverlay()}>
                            <Text style={{ padding: 15, color: '#969699' }}>取消</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => this.deleteTeam(id, isLeader, userId)}>
                            <Text style={{ padding: 15, color: '#2d94fd' }}>确认</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Overlay.PopView>
        )
        Overlay.show(overlayView)
    }

    onSessionShare = () => {
        this.onShowOverlay('weixin')
        this.state.drawer.close()
    }

    onQQShare = () => {
        this.onShowOverlay('mqq')
        this.state.drawer.close()
    }

    onOpenURL = (type) => {
        Linking.canOpenURL(`${type}://`).then(supported => {
            if (supported) {
                Linking.openURL(`${type}://`)
            } else { }
            this.overlayView.close()
        })
    }

    deleteTeam = (id, isLeader, userId) => {
        if (isLeader) {
            this.props.dispatch({
                type: 'teams/deleteTeam',
                payload: {
                    id
                }
            })
        } else {
            this.props.dispatch({
                type: 'teams/quitTeam',
                payload: {
                    id,
                    userId
                }
            })
        }
        this.onCloseOverlay()
    }

    putTeam = (type, number) => {
        let { menberInfo } = this.props
        let payload = {}
        payload.id = menberInfo.id
        payload[type] = number
        if (type === 'autoDestroyTime') {
            payload[type] = number * 1000 * 60 * 60 * 24 + (new Date(menberInfo.autoDestroyTime)).valueOf()
            this.setState({
                autoDestroyTime: payload[type]
            })
        }
        this.props.dispatch({
            type: 'teams/putTeam',
            payload
        })
        this.setState(payload)
        this.state.drawer.close()
    }

    modifyTeamMenber = (type, defaultIndex) => {
        let wheelValue = this[type][defaultIndex]
        let handleString = wheelValue => {
            return Number(typeof wheelValue === 'string' ? wheelValue.match(/\d+/)[0] : wheelValue)
        }
        let view = (
            <View style={styles.popupWrap}>
                <View style={styles.popupItemWrap}>
                    <Wheel
                        style={{ height: 200, width: '100%' }}
                        itemStyle={{ textAlign: 'center' }}
                        items={this[type]}
                        defaultIndex={defaultIndex}
                        holeLine={1}
                        onChange={(index) => {
                            wheelValue = handleString(this[type][index])
                        }}
                    />
                </View>
                <View style={styles.popupBtnWrap}>
                    <TouchableOpacity onPress={() => this.state.drawer.close()} style={styles.popupBtn} activeOpacity={0.9}>
                        <Text style={[styles.popupBtnText]}>取消</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.putTeam(type, handleString(wheelValue))
                    }} style={styles.popupBtn} activeOpacity={0.9}>
                        <Text style={[styles.popupBtnText, styles.popupBtnTextOk]}>确认</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )

        this.setState({
            drawer: Drawer.open(view, 'bottom')
        })
    }

    showRemoveMenber = () => {
        this.setState({
            isRemoveMenber: !this.state.isRemoveMenber
        })
    }

    removeMenber = (userId) => {
        let { menberInfo, dispatch } = this.props
        if (!this.state.isRemoveMenber) return
        dispatch({
            type: 'teams/removeMenber',
            payload: {
                userId,
                id: menberInfo.id
            }
        })
    }

    renderMenber = () => {
        let { menberInfo } = this.props
        if (!menberInfo.members) return null
        return menberInfo.members.map((item, index) => {
            return (
                <TouchableOpacity key={index} style={styles.menberItem} onPress={() => this.removeMenber(item.userId)}>
                    <View style={styles.menberAvatar}>
                        {
                            item.avatar
                                ? <CachedImage style={styles.menberAvatarImg} source={{ uri: item.avatar }} />
                                : <Image style={styles.menberAvatarImg} source={require('../../../assets/img/icon_user.png')} />
                        }
                    </View>
                    {this.state.isRemoveMenber && !item.leader && <Icon style={styles.menberDelIcon} name='ios-close-circle-outline' />}
                    <Text style={styles.menberItemText}>{item.userName}</Text>
                </TouchableOpacity>
            )
        })
    }

    renderOperation = () => {
        let { menberInfo } = this.props
        if (!menberInfo.leaderUserId) return null
        return (
            <View style={styles.operationWrap}>
                <TouchableOpacity style={styles.operationBtn} onPress={() => this.onShareAction(menberInfo.token)}>
                    <View style={styles.operationBtnIcon}>
                        <Icon name='md-add' size={28} color='#14BBFD' />
                    </View>
                    <Text style={styles.menberItemText}>邀请</Text>
                </TouchableOpacity>
                {menberInfo.members.length > 1 &&
                    <TouchableOpacity style={styles.operationBtn} onPress={() => this.showRemoveMenber()}>
                        <View style={styles.operationBtnIcon}>
                            <Icon name='md-remove' size={28} color='#14BBFD' />
                        </View>
                        <Text style={styles.menberItemText}>{this.state.isRemoveMenber ? '取消' : '移除'}</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }

    render() {
        let { menberInfo, menberName, userInfo } = this.props
        if (!menberInfo || !menberInfo.id) return <Loading />
        let isLeader = menberInfo.leaderUserId === userInfo.userId
        let { memberNum, autoDestroyTime } = this.state
        return (
            <ScrollView>
                <View style={styles.menberList}>
                    {this.renderOperation()}
                    <ScrollView horizontal>
                        {this.renderMenber()}
                    </ScrollView>
                </View>
                <TouchableOpacity style={styles.menberSettingItem} onPress={() => this.onShareAction(menberInfo.token)}>
                    <Text style={styles.menberSettingItemLeft}>队伍口令</Text>
                    <Text style={styles.menberSettingItemRight}>{menberInfo.token}</Text>
                    <Icon style={styles.menberItemArrow} name='ios-arrow-forward' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menberSettingItem} onPress={() => Actions.teamNameSettings({ name: menberInfo.name })}>
                    <Text style={styles.menberSettingItemLeft}>队伍名称</Text>
                    <Text style={styles.menberSettingItemRight}>{menberName || menberInfo.name}</Text>
                    <Icon style={styles.menberItemArrow} name='ios-arrow-forward' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menberSettingItem} onPress={() => this.modifyTeamMenber('memberNum', 3)}>
                    <Text style={styles.menberSettingItemLeft}>队伍人数/限制</Text>
                    <Text style={styles.menberSettingItemRight}>{menberInfo.members.length}人/{memberNum || menberInfo.memberNum}人</Text>
                    <Icon style={styles.menberItemArrow} name='ios-arrow-forward' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menberSettingItem} onPress={() => this.modifyTeamMenber('autoDestroyTime', 0)}>
                    <Text style={styles.menberSettingItemLeft}>自动解散时间</Text>
                    <Text style={styles.menberSettingItemRight}>{format(autoDestroyTime || menberInfo.autoDestroyTime, 'yyyy年MM月dd HH:mm')}</Text>
                    <Icon style={styles.menberItemArrow} name='ios-arrow-forward' />
                </TouchableOpacity>
                <View style={styles.menberSettingPadding} >
                    <Text>
                        队伍人数默认为5人，队长可在2~10人范围内调整；自动解散时间默认为当天零点整，队长可调整。
                    </Text>
                </View>
                <TouchableOpacity style={styles.menberSettingItem} onPress={() => Actions.userInfoSettings()} >
                    <Text style={styles.menberSettingItemLeft}>修改我的资料 </Text>
                    <Text style={styles.menberSettingItemRight}>{userInfo.nickName}</Text>
                    <Icon style={styles.menberItemArrow} name='ios-arrow-forward' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menberSettingSubmit} onPress={() => this.onConfirmQuitTeam(menberInfo.id, isLeader, userInfo.userId)}>
                    <Text style={styles.menberSettingSubmitText}>{isLeader ? '解散队伍' : '退出队伍'}</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

export default TeamSettings
