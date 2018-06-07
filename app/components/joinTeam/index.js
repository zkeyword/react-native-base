import React from 'react'
import { connect } from 'react-redux'
import { Text, View, Image, TouchableOpacity, AppState, Clipboard } from 'react-native'
// import { Actions } from 'react-native-router-flux'
// import { Overlay } from 'teaset'

import Model from '../model'
import styles from './style'

@connect(({ userInfo, teams }) => ({ ...userInfo, ...teams }))
class JoinTeam extends React.Component {
    state = {
        isShow: false,
        token: null
    }

    constructor(props) {
        super(props)
        this._handleAppStateChange = this.handleAppStateChange.bind(this)
        this.state = {
            _appState: AppState.currentState
        }
    }

    componentWillMount() {
        this.props.dispatch({
            type: 'userInfo/getUserInfo',
            payload: {
                access_token: this.props.accessToken
            }
        })
        AppState.addEventListener('change', this._handleAppStateChange)
    }

    componentWillUnmount() {
        // 删除状态改变事件监听
        AppState.removeEventListener('change', this._handleAppStateChange)
    }

    // 状态改变响应
    async handleAppStateChange(appState) {
        let clipboard = await Clipboard.getString()
        // console.log('state', appState, this.props.menberInfo, clipboard)
        if (appState !== 'active' || (this.props.menberInfo && this.props.menberInfo.members)) return
        // Clipboard.setString('#荔枝海组队口令#长按复制这条信息后，打开荔枝海即可加入队伍，或在组队功能中，输入队伍口令【466418】')
        let reg = /\d{6}/g
        if (clipboard.indexOf('#荔枝海组队口令#') !== -1) {
            console.log('state', 12121212)
            let tokens = clipboard.match(reg)
            console.log('state', 12121212)
            console.log('state', tokens)
            if (tokens.length > 0) {
                let token = tokens[0]
                this.setState({
                    token,
                    isShow: true
                })
                Clipboard.setString('')
            }
        }
    }

    joinTeam = () => {
        let { userInfo, dispatch } = this.props
        dispatch({
            type: 'teams/joinTeam',
            payload: {
                token: this.state.token,
                userId: userInfo.id,
                userName: userInfo.nickName,
                avatar: userInfo.avatar
            }
        })
        this.setState({
            isShow: false
        })
    }

    onClose = () => {
        this.setState({
            isShow: false
        })
    }

    render() {
        return (
            <Model
                onClose={() => this.onClose()}
                visible={this.state.isShow}
                icon={<Image style={{ marginLeft: 10 }} source={require('./img/map-joinTeam.png')} />}
                title={'组队邀请'}
                isShowClose
                content={
                    <View style={styles.content}>
                        <Text style={styles.name}>荔枝海</Text>
                        <Text style={styles.title}>邀您加入队伍</Text>
                        <Text style={styles.desc}>实时共享位置</Text>
                        <TouchableOpacity style={styles.btn} onPress={() => this.joinTeam()}>
                            <Text style={styles.btnText}>加入队伍</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        )
    }
}

export default JoinTeam
