export default {
    namespace: 'hitpointplay',
    state: {
        isAuto: true
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
                        isAuto: payload.isAuto
                    }
                }
            )
        }
    }
}
