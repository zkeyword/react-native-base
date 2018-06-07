import React from 'react'
import { AppRegistry, StatusBar } from 'react-native'
import * as WeChat from 'react-native-wechat'

import dva from './utils/dva'
import Router from './router'

import authModel from './models/auth'
import forgetModel from './models/forget'
import registerModel from './models/register'
import landmarkModel from './models/landMark'
import mapModel from './models/map'
import teamsModel from './models/teams'
import userInfoModel from './models/userInfo'
import vercheckModel from './models/vercheck'
import hitpointplayModel from './models/hitpointplay'
import audioTypeModel from './models/audioType'

const app = dva({
    initialState: {},
    models: [
        authModel,
        forgetModel,
        registerModel,
        landmarkModel,
        mapModel,
        teamsModel,
        userInfoModel,
        vercheckModel,
        hitpointplayModel,
        audioTypeModel
    ],
    onError(e) {
        console.log('onError', e)
    }
})

const App = app.start(<Router />)

class Entry extends React.Component {
    async componentDidMount() {
        try {
            await WeChat.registerApp('wx4450ef9180acd59f')
        } catch (e) {
            console.error(e)
        }
    }

    render() {
        return <App />
    }
}

AppRegistry.registerComponent('DvaStarter', () => Entry)
StatusBar.setBarStyle('light-content', true)
