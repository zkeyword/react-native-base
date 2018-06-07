import React, { Component } from 'react'
import { ScrollView, View, TextInput, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { Toast } from 'teaset'
import { passWord } from '../../utils/auth'

@connect(({ userInfo }) => ({ ...userInfo }))
class ModifyPwd extends Component {
    state = {
        oldPwd: '',
        newPwd: '',
        confirmNewPwd: ''
    }

    onSubmit = () => {
        let oldPwd = this.state.oldPwd
        let newPwd = this.state.newPwd
        let confirmNewPwd = this.state.confirmNewPwd
        if (/.*[\u4e00-\u9fa5]+.*$/i.test(newPwd)) {
            Toast.fail('请输入英文字符', 1)
        } else if (oldPwd.length < 6 || oldPwd.length > 16) {
            Toast.fail('请输入6~16的旧密码', 1)
        } else if (newPwd.length < 6 || newPwd.length > 16) {
            Toast.fail('请输入6~16的新密码', 1)
        } else if (newPwd !== confirmNewPwd) {
            Toast.fail('请输入相同的新密码', 1)
        } else {
            this.props.dispatch({
                type: 'userInfo/modifyPwd',
                payload: {
                    userId: this.props.userInfo.id,
                    oldPassword: passWord(oldPwd),
                    newPassword: passWord(newPwd)
                }
            })
        }
    }

    oldPwdTextChange = (e) => {
        this.setState(
            {
                oldPwd: e
            }
        )
    }

    newPwdTextChange = (e) => {
        this.setState(
            {
                newPwd: e
            }
        )
    }

    confirmNewPwdTextChange = (e) => {
        this.setState(
            {
                confirmNewPwd: e
            }
        )
    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: '#f4f4f4' }}>
                <View style={{ backgroundColor: 'white', marginVertical: 5, marginHorizontal: 5 }}>
                    <TextInput keyboardType={('email-address')} underlineColorAndroid='transparent' style={{ marginHorizontal: 15, marginVertical: 10 }} placeholder='当前密码' onChangeText={(e) => this.oldPwdTextChange(e)} autoCapitalize='none' autoCorrect={false} maxLength={16} />
                </View>

                <View style={{ backgroundColor: 'white', marginVertical: 5, marginHorizontal: 5 }}>
                    <TextInput keyboardType={('email-address')} underlineColorAndroid='transparent' style={{ marginHorizontal: 15, marginVertical: 10 }} placeholder='新密码' onChangeText={(e) => this.newPwdTextChange(e)} autoCapitalize='none' autoCorrect={false} maxLength={16} />
                </View>

                <View style={{ backgroundColor: 'white', marginVertical: 5, marginHorizontal: 5 }}>
                    <TextInput keyboardType={('email-address')} underlineColorAndroid='transparent' style={{ marginHorizontal: 15, marginVertical: 10 }} placeholder='确认密码' onChangeText={(e) => this.confirmNewPwdTextChange(e)} autoCapitalize='none' autoCorrect={false} maxLength={16} />
                </View>

                <TouchableOpacity style={{ backgroundColor: '#14BBFD', borderRadius: 15, marginHorizontal: 15, overflow: 'hidden', marginTop: 30 }} onPress={() => this.onSubmit()}>
                    <Text style={{ textAlign: 'center', margin: 10, color: 'white' }}>提交</Text>
                </TouchableOpacity>

            </ScrollView>
        )
    }
}

export default ModifyPwd
