import * as teamsService from '../services/teams'
import { Toast } from 'antd-mobile'
import { Actions } from 'react-native-router-flux'

export default {
    namespace: 'teams',
    state: {
        menberInfo: null,
        menberName: null,
        menbersLocation: {}
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        *post({ payload }, { call, put, select }) {
            const data = yield call(teamsService.post, payload)
            if (data && data.status) {
                if (data.status === 200) {
                    yield put({
                        type: 'save',
                        payload: {
                            token: data.data
                        }
                    })
                    let id = yield select(state => state.userInfo.userInfo.id)
                    yield put({ type: 'getMember', payload: { id } })
                    Actions.teamSettings()
                } else {
                    data.data && Toast.fail(data.message, 1)
                }
            }
        },
        *deleteTeam({ payload }, { call, put }) {
            const data = yield call(teamsService.del, payload)
            if (data && data.status) {
                if (data.status === 200) {
                    let promise = () => new Promise((resolve, reject) => {
                        Toast.success('操作成功', 1, () => {
                            resolve()
                        })
                    })
                    yield call(promise)
                    yield put({
                        type: 'save',
                        payload: {
                            menberInfo: null
                        }
                    })
                    Actions.pop()
                    Actions.refresh('map')
                } else {
                    data.data && Toast.fail(data.message, 1)
                }
            }
        },
        *putTeam({ payload }, { call, put, select }) {
            const data = yield call(teamsService.put, payload)
            if (data && data.status) {
                if (data.status === 200) {
                    let promise = () => new Promise((resolve, reject) => {
                        Toast.success('操作成功', 1, () => {
                            resolve()
                        })
                    })
                    let { userInfo } = yield select(state => state.userInfo)
                    yield put({
                        type: 'getMember',
                        payload: {
                            id: userInfo.id
                        }
                    })
                    yield call(promise)
                } else {
                    data.data && Toast.fail(data.message, 1)
                }
            }
        },
        *setTeamName({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload
            })
        },
        *getMember({ payload }, { call, put }) {
            const data = yield call(teamsService.getMember, payload)
            if (data && data.status) {
                if (data.status === 200) {
                    yield put({
                        type: 'save',
                        payload: {
                            menberInfo: data.data
                        }
                    })
                } else {
                    yield put({
                        type: 'save',
                        payload: {
                            menberInfo: []
                        }
                    })
                    data.data && Toast.fail(data.message, 1)
                }
            }
        },
        *putMemberLocation({ payload }, { call, put }) {
            yield call(teamsService.putMemberLocation, payload)
        },
        *removeMenber({ payload }, { call, put }) {
            const data = yield call(teamsService.delMember, payload)
            if (data && data.message) {
                Toast.fail(data.message, 1)
            }
        },
        *joinTeam({ payload }, { call, put }) {
            const data = yield call(teamsService.join, payload)
            if (data && data.status) {
                if (data.status === 200) {
                    let promise = () => new Promise((resolve, reject) => {
                        Toast.success('操作成功', 1, () => {
                            resolve()
                        })
                    })
                    yield call(promise)
                    yield put({
                        type: 'save',
                        payload: {
                            menberInfo: data.data
                        }
                    })
                    Actions.teamSettings()
                } else {
                    data.data && Toast.fail(data.message, 1)
                }
            } else if (data && data.message) {
                Toast.fail(data.message, 1)
            }
        },
        *quitTeam({ payload }, { call, put }) {
            const data = yield call(teamsService.quitTeam, payload)
            if (data && data.status) {
                if (data.status === 200) {
                    let promise = () => new Promise((resolve, reject) => {
                        Toast.success('操作成功', 1, () => {
                            resolve()
                        })
                    })
                    yield put({
                        type: 'save',
                        payload: {
                            menberInfo: null
                        }
                    })
                    yield call(promise)
                    Actions.pop()
                    Actions.refresh('map')
                } else {
                    data.data && Toast.fail(data.message, 1)
                }
            }
        },
        *editMenbersLocation({ payload }, { call, put }) {
            let menbersLocation = payload.menbersLocation
            if (payload.isDetete) {
                delete menbersLocation[payload.id]
            } else {
                menbersLocation[payload.id] = payload.data
            }
            yield put({
                type: 'save',
                payload: {
                    menbersLocation
                }
            })
        },
        *setMenberInfo({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload: {
                    menberInfo: payload.menberInfo
                }
            })
        },
        *reset(_, { put }) {
            yield put({
                type: 'save',
                payload: {
                    menberInfo: null,
                    menbersLocation: {}
                }
            })
        }
    }
}
