import React, { Component } from 'react'
import { TouchableOpacity, Image, View, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons'

import Modal from '../../../components/model'
import stompClient from '../../../utils/stompClient'
import styles from './style'
// import { Toast } from 'antd-mobile'

@connect(({ teams, userInfo, landMark }) => ({ ...teams, ...userInfo, ...landMark }))
class Team extends Component {
    state = {
        client: null
    }

    componentWillReceiveProps(nextprops) {
        let { userInfo, menberInfo, dispatch } = nextprops
        if (userInfo.id && !menberInfo && !this.membersLength()) {
            dispatch({
                type: 'teams/getMember',
                payload: {
                    id: userInfo.id
                }
            })
        }
    }

    componentWillUpdate(nextProps) {
        nextProps.menberInfo && nextProps.menberInfo.id && this.sock()
    }

    state = {
        isShow: false,
        code: ''
    }

    onTeamOrganizePress = () => {
        Actions.teamSettings()
    }

    onClose = () => {
        this.setState({
            isShow: false,
            code: ''
        })
    }

    sock = () => {
        if (!this.props.menberInfo || this.state.client) return
        const client = stompClient()
        this.setState({
            client
        }, () => {
            let members = {}
            let addMenber = item => {
                if (!this.props.menberInfo) {
                    client.disconnect()
                    return this.setState({
                        client: null
                    })
                }
                if (!members[item.userId]) {
                    members[item.userId] = client.subscribe(`/v0.1/teams/${this.props.menberInfo.token}/${item.userId}`, (greeting) => {
                        let data = JSON.parse(greeting.body)
                        this.props.dispatch({
                            type: 'teams/editMenbersLocation',
                            payload: {
                                isDetete: false,
                                id: data.userId,
                                data,
                                menbersLocation: JSON.parse(JSON.stringify(this.props.menbersLocation))
                            }
                        })
                    })
                }
            }

            let errorCb = function(error) {
                console.log('TeamerMarker', 'error:' + error)
                // Toast.fail('同步组队信息及位置通道连接失败', 1)
            }

            client.connect({}, (frame) => {
                this.props.menberInfo && client.subscribe(`/v0.1/teams/${this.props.menberInfo.token}`, (greeting) => {
                    let menberInfo = this.props.menberInfo
                    if (!menberInfo) return client.disconnect()
                    let values = JSON.parse(greeting.body)
                    console.log('TeamerMarker', 'values:' + values.type)
                    menberInfo.members = values.members
                    this.props.dispatch({
                        type: 'teams/setMenberInfo',
                        payload: {
                            menberInfo
                        }
                    })
                    if (values.type === 'NEW_MEMBER') {
                        addMenber(values.newMember)
                    } else if (values.type === 'DELETE_MEMBER') {
                        this.props.dispatch({
                            type: 'teams/editMenbersLocation',
                            payload: {
                                isDetete: true,
                                id: values.deleteMember.userId,
                                menbersLocation: JSON.parse(JSON.stringify(this.props.menbersLocation))
                            }
                        })
                        delete members[values.deleteMember.userId]
                    } else {
                        values.members.forEach((item, index) => {
                            addMenber(item)
                        })
                    }
                })
            }, errorCb)
        })
    }

    createTeam = () => {
        let { userInfo, userLocation, dispatch } = this.props
        let { code } = this.state
        if (code === '') {
            dispatch({
                type: 'teams/post',
                payload: {
                    userId: userInfo.id,
                    userName: userInfo.nickName,
                    avatar: userInfo.avatar
                }
            })
        } else {
            dispatch({
                type: 'teams/joinTeam',
                payload: {
                    token: code,
                    userId: userInfo.id,
                    userName: userInfo.nickName,
                    avatar: userInfo.avatar,
                    location: userLocation
                }
            })
        }
        this.onClose()
    }

    onInputClose = () => {
        this.setState({
            code: ''
        })
    }

    renderInputClose = code => {
        if (!code) return null
        return (
            <TouchableOpacity style={styles.modelInputClose} onPress={() => this.onInputClose()} >
                <Icon style={styles.modelInputCloseIcon} name='ios-close-circle' />
            </TouchableOpacity>
        )
    }

    renderModel = () => {
        // let { menberInfo } = this.props
        // if (!menberInfo) return null
        return (
            <Modal
                onClose={this.onClose}
                visible={this.state.isShow}
                content={
                    <View style={{ flex: 1 }}>
                        <View style={styles.modelHeader}>
                            <Image style={{ width: '100%' }} resizeMode={Image.resizeMode.stretch} source={require('./img/map_add-team_middle.png')} />
                        </View>
                        <View style={styles.modelMain}>
                            <TouchableOpacity style={styles.modelBtn} onPress={() => this.createTeam()}>
                                <Text style={styles.modelBtnText}>{this.state.code ? '加入队伍' : '创建队伍'}</Text>
                            </TouchableOpacity>
                            <TextInput
                                underlineColorAndroid='transparent'
                                keyboardType='numeric'
                                placeholder='输入队伍口令'
                                style={styles.modelInput}
                                onChangeText={code => this.setState({ code })}
                                maxLength={6}
                                value={this.state.code}
                            />
                            {this.renderInputClose(this.state.code)}
                        </View>
                    </View>
                }
            />
        )
    }

    membersLength = () => {
        let { menberInfo, userInfo } = this.props
        let isInMenber = menberInfo && menberInfo.members && menberInfo.members.filter(item => {
            return item.userId === userInfo.id
        }).length
        return isInMenber ? menberInfo.members.length : false
    }

    renderIcon = () => {
        let len = this.membersLength()
        if (len) {
            return (
                <TouchableOpacity onPress={() => this.onTeamOrganizePress()}>
                    <Image source={require('./img/map_btn_team_normal.png')} />
                    <Text style={styles.iconText}>{len}人</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => this.setState({ isShow: true })}>
                    <Image source={require('./img/map_btn_overview_normal.png')} />
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <View>
                {this.renderIcon()}
                {this.renderModel()}
            </View>
        )
    }
}

export default Team
