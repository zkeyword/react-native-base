import * as userService from '../services/user'
import { randomCode } from '../utils/auth'
import { url } from '../config'
import { Actions } from 'react-native-router-flux'
import { Toast } from 'teaset'

export default {
    namespace: 'forget',
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
        *getCaptcha(_, { call, put }) {
            let randomID = randomCode(10)
            yield put({
                type: 'save',
                payload: {
                    randomID,
                    captchaURL: `${url}/v0.1/captcha?customer=${randomID}`
                }
            })
        },
        // 获取忘记密码短信验证码
        *getSMSCodeForForget({ payload }, { call, put }) {
            const data = yield call(userService.getSMSCodeForForget, payload)
            if (data && data.status) {
                if (data.status === 200) {
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
        // 修改忘记密码
        * forgetPwd({ payload }, { call, put }) {
            const data = yield call(userService.forgetPwd, payload)
            if (data.status && data.status === 200) {
                Toast.success(data.data.message, 1)
                Actions.popTo('login')
            } else {
                Toast.fail(data.message, 1)
            }
        },
        * reset(_, { put }) {
            yield put({
                type: 'save',
                payload: {
                    triggerCountDown: false
                }
            })
        }
    },
    subscriptions: {
        setup({ dispatch }) {
            dispatch({ type: 'getCaptcha' })
        }
    }
}
