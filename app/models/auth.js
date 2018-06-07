import { Toast } from 'teaset'

import * as authService from '../services/auth'
import { Actions } from 'react-native-router-flux'
import { Storage } from '../utils'

export default {
    namespace: 'auth',
    state: {
        expiresAt: null,
        secret: null,
        accessToken: null,
        isLogin: false,
        loading: true
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        *post({ payload }, { call, put }) {
            const data = yield call(authService.post, payload)
            if (data && data.status) {
                if (data.status === 404) {
                    Toast.fail('请检查用户名或者密码是否正确！', 1)
                } if (data.status === 200) {
                    yield put({
                        type: 'saveToken',
                        payload: {
                            ...data.data
                        }
                    })
                }
            } else {
                Toast.fail(data.message, 1)
            }
        },
        *del({ payload }, { call, put }) {
            const data = yield call(authService.del)
            yield put({
                type: 'save',
                payload: { data: data.data }
            })
        },
        *loadToken(_, { call, put }) {
            const accessToken = yield call(Storage.get, 'accessToken', false)
            // const expiresAt = yield call(Storage.get, 'expiresAt', false)
            // const secret = yield call(Storage.get, 'secret', false)
            yield put({
                type: 'save',
                payload: {
                    accessToken,
                    // expiresAt,
                    // secret,
                    isLogin: !!accessToken,
                    loading: false
                }
            })
        },
        *saveToken({ payload }, { call, put }) {
            let promise = () => new Promise((resolve, reject) => {
                Toast.success('登录成功，请稍后', 1, () => {
                    resolve()
                })
            })
            yield call(Storage.set, 'accessToken', payload.accessToken)
            yield call(Storage.set, 'expiresAt', payload.expiresAt)
            yield call(Storage.set, 'secret', payload.secret)
            yield call(promise)
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
        },
        *removeToken(_, { call, put }) {
            Actions.reset('login')
            let promise = () => new Promise((resolve, reject) => {
                Toast.success('退出成功', 1, () => {
                    resolve()
                })
            })
            yield call(promise)
            yield call(Storage.remove, 'accessToken')
            yield call(Storage.remove, 'expiresAt')
            yield call(Storage.remove, 'secret')
        }
    },
    subscriptions: {
        setup({ dispatch }) {
            dispatch({ type: 'loadToken' })
        }
    }
}
