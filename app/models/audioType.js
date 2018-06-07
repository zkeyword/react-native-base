import { Storage } from '../utils'

export default {
    namespace: 'audioType',
    state: {
        audioType: 'WOMEN'
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        *set({ payload }, { call, put }) {
            yield put(
                {
                    type: 'save',
                    payload: {
                        audioType: payload.audioType
                    }
                }
            )
            Storage.set('audioType', payload.audioType)
        },
        *loadAudioType(_, { call, put }) {
            let audioType = yield Storage.get('audioType')
            if (audioType) {
                yield put(
                    {
                        type: 'save',
                        payload: {
                            audioType
                        }
                    }
                )
            } else {
                Storage.set('audioType', 'WOMEN')
            }
        }
    },
    subscriptions: {
        setup({ dispatch }) {
            dispatch({ type: 'loadAudioType' })
        }
    }
}
