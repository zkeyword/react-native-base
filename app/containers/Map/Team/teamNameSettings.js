import React, { Component } from 'react'
import { ScrollView, View, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'

import HeaderTitle from '../../../components/headerTitle'
import HeaderLeft from './headerLeft'
import HeaderRight from './headerRight'

@connect(({ teams, userInfo }) => ({ ...teams, ...userInfo }))
class TeamSettings extends Component {
    static navigationOptions = {
        headerTitle: <HeaderTitle title='修改队伍名称' />,
        headerLeft: <HeaderLeft />,
        headerRight: <HeaderRight />
    }

    state = {
        teamName: this.props.menberName || (this.props.menberInfo !== null) ? this.props.menberInfo.name : null
    }

    putTeam = (type) => {
        let payload = {}
        payload[type] = this.state.wheelValue
        payload.id = this.props.menberInfo.id
        this.props.dispatch({
            type: 'teams/putTeam',
            payload
        })
        this.setState(payload)
        this.state.drawer.close()
    }

    onChangeMenberName = menberName => {
        this.props.dispatch({
            type: 'teams/setTeamName',
            payload: {
                menberName
            }
        })

        this.state.teamName = menberName
    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: '#f4f4f4' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', marginVertical: 5 }}>
                    <Text style={{ margin: 15 }}>队伍名称 </Text>
                    <TextInput
                        underlineColorAndroid='transparent'
                        placeholder='请输入昵称'
                        style={{ color: '#666666', marginRight: 15, textAlign: 'right', flex: 1 }}
                        value={this.state.teamName}
                        onChangeText={(e) => this.onChangeMenberName(e)}
                    />
                </View>
            </ScrollView >
        )
    }
}

export default TeamSettings
