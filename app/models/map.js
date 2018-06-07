import * as scenicsService from '../services/scenics'
import { Storage } from '../utils'

export default {
    namespace: 'map',
    state: {
        scenicsData: null
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        *getScenics(_, { call, put }) {
            // 缓存景区信息
            const scenicsData = yield call(Storage.get, 'scenicsData', false)
            if (scenicsData) {
                yield put({
                    type: 'save',
                    payload: { scenicsData }
                })
            }
            // 获取景区信息
            const data = yield call(scenicsService.get)
            if (data && data.data) {
                yield call(Storage.set, 'scenicsData', data.data)
                yield put({
                    type: 'save',
                    payload: { scenicsData: data.data }
                })
            }
        }
    }
}
