import * as userService from '../services/user'
import { Toast } from 'teaset'
import { Actions } from 'react-native-router-flux'

export default {
    namespace: 'userInfo',
    state: {
        userInfo: {},
        avatar: '',
        nickName: '',
        sex: '',
        avatarSource: ''
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        // 通过accessToken 获得用户信息
        *getUserInfo({ payload }, { call, put }) {
            if (!payload.access_token) return // TODO 后续优化
            const data = yield call(userService.getUserInfo, payload.access_token)
            if (data && data.status) {
                if (data.status === 200) {
                    yield put({
                        type: 'save',
                        payload: {
                            userInfo: data.data
                        }
                    })
                } else {
                    Toast.fail(data.message, 1)
                }
            }
        },
        *modifyPwd({ payload }, { call, put }) {
            const data = yield call(userService.modifyPwd, payload)
            if (data.status === 200) {
                Toast.success(data.data.msg, 1)
                Actions.pop()
            } else {
                Toast.fail(data.message, 1)
            }
        },
        *uploadImg({ payload }, { call, put }) {
            const data = yield call(userService.imageUpload, payload.file)
            if (data && data.status) {
                if (data.status === 200) {
                    yield put({
                        type: 'save',
                        payload: {
                            avatar: data.data.url
                        }
                    })
                    Toast.success('图像上传成功', 1)
                } else {
                    Toast.fail('图像上传失败', 1)
                }
            }
        },
        *editUser({ payload }, { call, put, select }) {
            let userInfo = yield select(state => state.userInfo.userInfo)
            payload = Object.assign({}, userInfo, payload)
            const data = yield call(userService.editUser, payload)
            if (data && data.status) {
                if (data.status === 200) {
                    yield put({
                        type: 'save',
                        payload: {
                            userInfo: data.data
                        }
                    })
                    Toast.success('用户信息修改成功', 1)
                    Actions.pop()
                } else {
                    data.data && Toast.fail(data.message, 1)
                }
            }
        },
        * copyUserInfo(_, { call, put, select }) {
            const state = yield select(state => state.userInfo)
            yield put({
                type: 'save',
                payload: {
                    avatar: state.userInfo.avatar,
                    nickName: state.userInfo.nickName,
                    sex: state.userInfo.sex,
                    avatarSource: state.userInfo.avatar
                }
            })
        },
        * putAvatarSource({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload: {
                    avatarSource: payload.uri
                }
            })
        },
        * putNickName({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload
            })
        },
        * putSex({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload
            })
        },
        *reset(_, { put }) {
            yield put({
                type: 'save',
                payload: {
                    userInfo: {},
                    avatar: '',
                    nickName: '',
                    sex: '',
                    avatarSource: ''
                }
            })
        }
    }
}
