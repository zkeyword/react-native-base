// import { Toast } from 'teaset'
// import * as vercheckService from '../services/vercheck'
// import { Platform } from 'react-native'
// // import deviceInfo from 'react-native-device-info'
// import { compare } from '../utils/compareVersion'

export default {
    namespace: 'vercheck',
    state: {
        foundNewVersion: false,
        newVersion: ''
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        *get(_, { call, put }) {
            // let payload = Platform.OS
            // let currentVersion = deviceInfo.getVersion()
            // const data = yield call(vercheckService.get, payload)
            // if (data && data.status) {
            //     if (data.status === 200) {
            //         if (compare(currentVersion, data.data.version)) {
            //             Toast.success('最新版本', 1)
            //         } else {
            //             yield put({
            //                 type: 'save',
            //                 payload: { foundNewVersion: true, newVersion: data.data.version }
            //             })
            //         }
            //     }
            // }
        },
        *reset(_, { call, put }) {
            yield put(
                {
                    type: 'save',
                    payload: {
                        foundNewVersion: false
                    }
                }
            )
        }
    }
}
