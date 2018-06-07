import React, { Component } from 'react'
import { View, Image, TouchableOpacity, ScrollView, Platform } from 'react-native'
import { connect } from 'react-redux'
import { createForm } from 'rc-form'
import { List, InputItem, Button } from 'antd-mobile'
import { Toast } from 'teaset'
import styles from './style'
import { passWord } from '../../utils/auth'

@connect(({ forget }) => ({ ...forget }))
class Forget extends Component {
    constructor(props) {
        super(props)
        this.props.dispatch({
            type: 'forget/reset'
        })
    }
    state = {
        isShowPwd: false,
        isShowConfirmPwd: false,
        pwdType: 'password',
        confimPwdType: 'password',
        totalTime: 60,
        countDown: false,
        needTriggerCountDown: false
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.triggerCountDown) {
            if (this.state.needTriggerCountDown !== nextProps.triggerCountDown) {
                this.setState(
                    {
                        needTriggerCountDown: nextProps.triggerCountDown
                    }
                )
                this.onTimeInterval()
            }
        }
    }

    onTimeInterval = () => {
        this.setState({
            countDown: true
        })
        this.timer = setInterval(
            () => {
                let tempTotalTime = this.state.totalTime
                tempTotalTime--
                this.setState({
                    totalTime: tempTotalTime
                })
                if (this.state.totalTime <= 0) {
                    clearInterval(this.timer)
                    this.setState({
                        countDown: false,
                        totalTime: 60,
                        needTriggerCountDown: !this.state.needTriggerCountDown
                    })
                }
            },
            1000
        )
    }

    onCaptchChang = () => {
        let { dispatch } = this.props
        dispatch({
            type: 'forget/getCaptcha'
        })
    }

    onHandleSubmit = () => {
        let { dispatch, form: { validateFields, getFieldValue } } = this.props
        validateFields((err, data) => {
            if (err) {
                let phoneNum = err.phoneNum
                let smsCode = err.smsCode
                let pwd = err.pwd
                let confirmPwd = err.confirmPwd
                if (phoneNum && phoneNum.errors.length) {
                    Toast.fail(phoneNum.errors[0].message, 1)
                    return
                } else if (smsCode && smsCode.errors.length) {
                    Toast.fail(smsCode.errors[0].message, 1)
                    return
                } else if (pwd && pwd.errors.length) {
                    Toast.fail(pwd.errors[0].message, 1)
                    return
                } else if (confirmPwd && confirmPwd.errors.length) {
                    Toast.fail(confirmPwd.errors[0].message, 1)
                    return
                }
            }
            let phoneNum = data.phoneNum.replace(/\s/g, '')
            let smsCode = getFieldValue('smsCode')
            let pwd = getFieldValue('pwd')
            let newPwd = passWord(pwd)
            dispatch(
                {
                    type: 'forget/forgetPwd',
                    payload: {
                        phone: phoneNum,
                        appId: '0002',
                        smsCode: smsCode,
                        username: phoneNum,
                        password: newPwd
                    }
                }
            )
        })
    }

    onFetchSMSCode = () => {
        let { dispatch, form: { validateFields } } = this.props
        validateFields((err, data) => {
            if (err) {
                let phoneNum = err.phoneNum
                let captcha = err.captcha
                if (phoneNum && phoneNum.errors.length) {
                    Toast.fail(phoneNum.errors[0].message, 1)
                    return
                } else if (captcha && captcha.errors.length) {
                    Toast.fail(captcha.errors[0].message, 1)
                    return
                }
            }
            let phoneNum = data.phoneNum.replace(/\s/g, '')
            dispatch(
                {
                    type: 'forget/getSMSCodeForForget',
                    payload: {
                        phone: phoneNum,
                        appId: '0002',
                        captcha: data.captcha,
                        customer: this.props.randomID
                    }
                }
            )
        })
    }

    onPwdVisibelClick = (type) => {
        if (type === '1') {
            this.setState({
                isShowPwd: (!this.state.isShowPwd),
                pwdType: (!this.state.isShowPwd ? 'text' : 'password')
            })
        } else {
            this.setState({
                isShowConfirmPwd: (!this.state.isShowConfirmPwd),
                confimPwdType: (!this.state.isShowConfirmPwd ? 'text' : 'password')
            })
        }
    }

    checkPhoneNum = (rule, value, callback) => {
        const { getFieldValue } = this.props.form
        if (getFieldValue('phoneNum') && getFieldValue('phoneNum').length < 11) {
            callback('请输入正确的手机号')
        } else {
            callback()
        }
    }

    checkConfirmPwd = (rule, value, callback) => {
        const { getFieldValue } = this.props.form
        if (value && value.length < 6) {
            callback('请输入6位以上密码')
        } else if (value && value !== getFieldValue('pwd')) {
            callback('请输入相同的密码')
        } else {
            callback()
        }
    }

    checkPwd = (rule, value, callback) => {
        if (value && value.length < 6) {
            callback('请输入6位以上密码')
        } else {
            callback()
        }
    }

    render() {
        let { captchaURL } = this.props
        const { getFieldProps } = this.props.form
        const { isShowPwd, isShowConfirmPwd, pwdType, confimPwdType } = this.state
        return (
            <ScrollView keyboardDismissMode={Platform.OS === 'android' ? ('interactive') : ('interactive', 'on-drag')} overScrollMode='always'>
                <List style={{ marginTop: 10 }} >
                    <InputItem
                        {
                        ...getFieldProps('phoneNum', {
                            rules: [{
                                required: true,
                                message: '请输入手机号'
                            }, {
                                validator: this.checkPhoneNum
                            }],
                            initialValue: this.props.phoneNum
                        })
                        }
                        placeholder='手机号码'
                        type='number'
                        maxLength={11} />
                </List>
                <List style={{ marginTop: 10 }} >
                    <InputItem
                        {
                        ...getFieldProps('captcha', {
                            rules: [{
                                required: true,
                                message: '请输入图形验证码'
                            }]
                        })
                        }
                        extra={
                            <View style={styles.containers}>
                                <Image style={styles.logo}
                                    source={{ uri: captchaURL }} />
                                <TouchableOpacity
                                    style={{ paddingLeft: 10 }}
                                    activeOpacity={0.5}
                                    onPress={() => this.onCaptchChang()}
                                >
                                    <Image
                                        source={require('./img/refresh.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        }
                        placeholder='图形验证码'
                        type='number'
                        maxLength={4}
                    />
                </List>
                <List style={{ marginTop: 10 }} >
                    <InputItem
                        {
                        ...getFieldProps('smsCode', {
                            rules: [{
                                required: true,
                                message: '请输入短信验证码'
                            }]
                        })
                        }
                        type='number'
                        maxLength={4}
                        extra={
                            <Button type='primary' size='small' disabled={this.state.countDown}
                                onClick={() => this.onFetchSMSCode()}> {this.state.countDown ? `${this.state.totalTime}s` : '获取验证码'}</Button>
                        } placeholder='手机验证码' />
                </List>
                <List style={{ marginTop: 10 }} >
                    <InputItem
                        {
                        ...getFieldProps('pwd', {
                            rules: [{
                                required: true,
                                message: '请输入密码'
                            }, {
                                validator: this.checkPwd
                            }]
                        })
                        }
                        maxLength={16}
                        type={pwdType} extra={
                            <TouchableOpacity
                                style={{ paddingLeft: 10 }}
                                activeOpacity={0.5}
                                onPress={() => this.onPwdVisibelClick('1')}
                            >
                                {
                                    isShowPwd ? <Image source={require(`../../assets/img/login_show.png`)} /> : <Image source={require(`../../assets/img/login_hide.png`)} />
                                }
                            </TouchableOpacity>
                        } placeholder='请输入6~16位密码' />
                    <InputItem
                        {
                        ...getFieldProps('confirmPwd', {
                            rules: [{
                                required: true,
                                message: '请输入确认密码'
                            }, {
                                validator: this.checkConfirmPwd
                            }]
                        })
                        }
                        maxLength={16}
                        type={confimPwdType} extra={
                            <TouchableOpacity
                                style={{ paddingLeft: 10 }}
                                activeOpacity={0.5}
                                onPress={() => this.onPwdVisibelClick('2')}
                            >
                                {
                                    isShowConfirmPwd ? <Image source={require(`../../assets/img/login_show.png`)} /> : <Image source={require(`../../assets/img/login_hide.png`)} />
                                }
                            </TouchableOpacity>
                        } placeholder='请输入6~16位确认密码' />
                </List>
                <Button type='primary' style={styles.botton} onClick={() => this.onHandleSubmit()}>确认</Button>
            </ScrollView >
        )
    }
}

export default createForm()(Forget)
