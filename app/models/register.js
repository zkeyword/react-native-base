import * as userService from '../services/user'
import * as authService from '../services/auth'

import { randomCode } from '../utils/auth'
import { url } from '../config'
import { Actions } from 'react-native-router-flux'
import { Toast } from 'teaset'
import { Storage } from '../utils'

export default {
    namespace: 'register',
    state: {
        randomID: '',
        captchaURL: '',
        triggerCountDown: false
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        // 获得图片验证码
        * getCaptcha(_, { call, put }) {
            let randomID = randomCode(10)
            yield put({
                type: 'save',
                payload: {
                    randomID,
                    captchaURL: `${url}/v0.1/captcha?customer=${randomID}`
                }
            })
        },
        // 获取注册短信验证码
        * getSMSCodeForRegister({ payload }, { call, put }) {
            const data = yield call(userService.getSMSCodeForRegister, payload)
            if (data.status === 200) {
                if (data.data.code === 0) {
                    yield put({
                        type: 'save',
                        payload: { triggerCountDown: true }
                    })
                    Toast.success(data.data.msg, 1)
                } else {
                    Toast.fail(data.data.msg, 1)
                }
            } else {
                Toast.fail(data.message, 1)
            }
        },
        // 用户注册
        *userRegister({ payload }, { call, put }) {
            const data = yield call(userService.userRegister, payload)
            if (data.status && data.status === 200) {
                Toast.success('注册成功', 1)
                const loginData = yield call(authService.post, payload)
                yield put({
                    type: 'saveToken',
                    payload: {
                        ...loginData.data
                    }
                })
            } else {
                Toast.fail(data.message, 1)
            }
        },
        *reset(_, { put }) {
            yield put({
                type: 'save',
                payload: {
                    triggerCountDown: false
                }
            })
        },
        // TODO： 和auth models一样的实现，待优化
        *saveToken({ payload }, { call, put }) {
            yield call(Storage.set, 'accessToken', payload.accessToken)
            yield call(Storage.set, 'expiresAt', payload.expiresAt)
            yield call(Storage.set, 'secret', payload.secret)
            yield put({
                type: 'save',
                payload: {
                    accessToken: payload.accessToken,
                    // expiresAt,
                    // secret,
                    isLogin: true
                }
            })
            Actions.reset('drawerMenu')
        }
    },
    subscriptions: {
        setup({ dispatch }) {
            dispatch({ type: 'getCaptcha' })
        }
    }
}
