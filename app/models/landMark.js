import * as landMarkService from '../services/landMark'
import { Toast } from 'teaset'
import { Storage } from '../utils'

export default {
    namespace: 'landMark',
    state: {
        landmarkTypeArr: [],
        POIArr: [],
        isRenderPOIArr: false,
        duplicatePOIArr: [],
        polylineArr: [],
        routeInfo: {},
        shortRouteArr: [],
        isRenderNavigator: false,
        isNavigator: false,
        currentLandmarkType: 'SCENIC',
        searchKeyword: '',
        POIInfo: {},
        userLocation: {}
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        *getLandMarkType(_, { call, put }) {
            const data = yield call(landMarkService.getLandMarkType)
            if (data && data.status) {
                if (data.status === 200) {
                    yield put({
                        type: 'save',
                        payload: { landmarkTypeArr: data }
                    })
                } else {
                    Toast.fail(data.message, 1)
                }
            }
        },
        *getLandMarkPOI({ payload }, { call, put }) {
            // 缓存景点列表
            const landMarkPOI = yield call(Storage.get, 'landMarkPOI', false)
            if (landMarkPOI) {
                yield put({
                    type: 'save',
                    payload: {
                        POIArr: landMarkPOI,
                        isRenderPOIArr: true
                    }
                })
            }

            // 获取景点列表
            const data = yield call(landMarkService.getLandMarkPOI, payload)
            if (data && data.status) {
                if (data.status === 200) {
                    data.data.items.map((item, index) => {
                        item.key = index
                        return item
                    })
                    yield call(Storage.set, 'landMarkPOI', data.data.items)
                    yield put({
                        type: 'save',
                        payload: {
                            POIArr: data.data.items,
                            isRenderPOIArr: true
                        }
                    })
                } else {
                    Toast.fail(data.message, 1)
                }
            }
        },
        *resetIsRenderPOIArr(_, { call, put }) {
            yield put({
                type: 'save',
                payload: { isRenderPOIArr: false }
            })
        },
        *getRouteNameList(_, { call, put }) {
            const data = yield call(landMarkService.getRouteNameList)
            if (data && data.status) {
                if (data.status === 200) {
                    yield put({
                        type: 'save',
                        payload: { polylineArr: data.data }
                    })
                } else {
                    Toast.fail(data.message, 1)
                }
            }
        },
        *getRouteInfoById({ payload }, { call, put }) {
            const data = yield call(landMarkService.getRouteInfoById, payload.tourRouteId)
            if (data && data.status) {
                if (data.status === 200) {
                    yield put({
                        type: 'save',
                        payload: { routeInfo: data.data, isNavigator: false, isRenderNavigator: true }
                    })
                } else {
                    Toast.fail(data.message, 1)
                }
            }
        },
        *getShortRoute({ payload }, { call, put }) {
            const data = yield call(landMarkService.getShortRoute, payload)
            if (data && data.status) {
                if (data.status === 200) {
                    yield put({
                        type: 'save',
                        payload: { shortRouteArr: data.data, isNavigator: true, isRenderNavigator: true }
                    })
                } else {
                    Toast.fail(data.message, 1)
                }
            }
        },
        *resetIsRenderNavigator(_, { call, put }) {
            yield put({
                type: 'save',
                payload: { isRenderNavigator: false }
            })
        },
        *modifyCurrentSelectLandMarkType({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload: { currentLandmarkType: payload.type }
            })
        },
        *modifyKeyword({ payload }, { call, put }) {
            yield put(
                {
                    type: 'save',
                    payload: {
                        searchKeyword: payload.searchKeyword
                    }
                }
            )
        },
        *filterPOIArrToPOIArrDuplicate({ payload }, { call, put }) {
            var POIArr = payload.POIArr
            var searchKeyword = payload.searchKeyword
            var duplicatePOIArr = []
            POIArr.map((item, index) => {
                var reg = new RegExp(searchKeyword, 'g')
                if (reg.test(item.name)) {
                    duplicatePOIArr.push(item)
                }
            })
            yield put(
                {
                    type: 'save',
                    payload: {
                        duplicatePOIArr
                    }
                }
            )
        },
        *setState({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload
            })
        }
    },
    subscriptions: {

    }
}
