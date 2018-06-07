import React, { Component } from 'react'
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { InputItem } from 'antd-mobile'
import { Toast } from 'teaset'
import { createForm } from 'rc-form'
import { Actions } from 'react-native-router-flux'

import { passWord } from '../../utils/auth'
import styles from './style'

import './img/login_userid_blue.png'
import './img/login_password_blue.png'

@connect(({ auth }) => ({ ...auth }))
class Login extends Component {
    state = {
        isUsernameFocus: false,
        isPasswordFocus: false,
        isShowPwd: false,
        inputType: 'password'
    }

    onLogin = () => {
        let { dispatch, form: { validateFields } } = this.props
        validateFields((err, data) => {
            if (err) {
                if (err.username) return Toast.fail(err.username.errors[0].message, 1)
                if (err.password) return Toast.fail(err.password.errors[0].message, 1)
            }
            data.password = passWord(data.password)
            dispatch({
                type: 'auth/post',
                payload: {
                    ...data
                }
            })
        })
    }

    onFocus = (type) => {
        if (type === 'username') {
            this.setState({
                isUsernameFocus: true
            })
        } else {
            this.setState({
                isPasswordFocus: true
            })
        }
    }

    onBlur = (type) => {
        this.setState({
            isUsernameFocus: false,
            isPasswordFocus: false
        })
    }

    changInputType = () => {
        this.setState({
            inputType: this.state.inputType === 'password' ? 'text' : 'password'
        })
    }

    render() {
        const { getFieldProps } = this.props.form
        let { isUsernameFocus, isPasswordFocus, inputType } = this.state
        return (
            <View style={styles.containers}>
                <ScrollView overScrollMode='always' showsVerticalScrollIndicator={false}>
                    <View style={styles.logo}>
                        <Image
                            source={require('./img/login_logo.png')}
                            onPressIn={this.onClickView}
                        />
                    </View>
                    <View style={styles.list}>
                        <View style={styles.icon}>
                            {
                                isUsernameFocus ? <Image source={require(`./img/login_userid_blue.png`)} /> : <Image source={require(`./img/login_userid_black.png`)} />
                            }
                        </View>
                        <InputItem
                            {
                            ...getFieldProps('username', {
                                rules: [{
                                    required: true,
                                    message: '请输入手机号'
                                }]
                            })
                            }
                            autoCapitalize='none'
                            autoCorrect={false}
                            placeholder='请输入您的手机号'
                            maxLength={11}
                            style={styles.inputItem}
                            onFocus={() => this.onFocus('username')}
                            onBlur={() => this.onBlur()}
                        />
                    </View>
                    <View style={styles.list}>
                        <View style={styles.icon}>
                            {
                                isPasswordFocus ? <Image source={require(`./img/login_password_blue.png`)} /> : <Image source={require(`./img/login_password_black.png`)} />
                            }
                        </View>
                        <InputItem
                            {
                            ...getFieldProps('password', {
                                rules: [{
                                    required: true,
                                    message: '请输入您的密码'
                                }]
                            })
                            }
                            type={inputType}
                            placeholder='请输入您的密码'
                            maxLength={16}
                            style={styles.inputItem}
                            onFocus={() => this.onFocus('password')}
                            onBlur={() => this.onBlur()}
                        />
                        <TouchableOpacity
                            style={{ paddingLeft: 10 }}
                            activeOpacity={0.5}
                            onPress={() => this.changInputType()}
                        >
                            {
                                inputType === 'password' ? <Image source={require(`../../assets/img/login_hide.png`)} /> : <Image source={require(`../../assets/img/login_show.png`)} />
                            }
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.botton} onPress={() => this.onLogin()} activeOpacity={0.5} >
                        <Text style={styles.bottonText}>登  录</Text>
                    </TouchableOpacity>
                    <View style={styles.footer}>
                        <View><Text style={styles.textBgColor} onPress={() => Actions.forget({ phoneNum: (getFieldProps('username')).value })}>忘记密码</Text></View>
                        <View style={styles.footerSplit}><Text style={styles.textBgColor}>|</Text></View>
                        <View><Text style={styles.textBgColor} onPress={() => Actions.register()}>注册账号</Text></View>
                    </View>
                </ScrollView>

                <Image
                    style={styles.background}
                    source={require('./img/login_bg.jpg')}
                    resizeMode={Image.resizeMode.stretch}
                />
            </View>
        )
    }
}

export default createForm()(Login)
