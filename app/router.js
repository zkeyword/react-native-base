import React, { PureComponent } from 'react'
import { Scene, Router, Drawer, Stack } from 'react-native-router-flux'
import { Image, View } from 'react-native'
import { connect } from 'react-redux'

import Loading from './components/Loading'
import HeaderLeftBack from './components/headerLeftBack'
import DrawerContent from './components/siderDrawer'
import * as styles from './assets/style/layout'
import Login from './containers/Login'
import Register from './containers/Register'
import Forget from './containers/Forget'
// import Home from './containers/Home'
import ComingSoon from './containers/ComingSoon'
import map from './containers/Map/Index'
import POIDetail from './containers/Map/POIDetail'
import UserSettings from './containers/UserSettings'
import ModifyPwd from './containers/UserSettings/pwdModify'
import TeamSettings from './containers/Map/Team/teamSettings'
import TeamNameSettings from './containers/Map/Team/teamNameSettings'
import UserInfoSettings from './containers/UserSettings/userInfoSettings'
import ScanScreen from './containers/Map/QRCodeScanner'
import WebView from './containers/WebView'

@connect(({ auth }) => ({ ...auth }))
class RouterComponent extends PureComponent {
    render() {
        let { isLogin, loading } = this.props
        if (loading) return <Loading />
        return (
            <Router>
                <Stack key='root' {...styles.navigationOption}>
                    <Scene key='login' hideNavBar component={Login} title=' 登录' initial={!isLogin} />
                    <Scene key='forget' component={Forget} title=' 忘记密码' renderLeftButton={<HeaderLeftBack />} />
                    <Scene key='register' component={Register} title=' 注册' renderLeftButton={<HeaderLeftBack />} />
                    <Scene key='comingSoon' clone title='敬请期待' component={ComingSoon} renderLeftButton={<HeaderLeftBack />} />
                    <Scene key='POIDetail' clone getTitle={({ navigation }) => navigation.state.params.title} component={POIDetail} renderLeftButton={<HeaderLeftBack />} />
                    <Scene key='userSettings' clone title='设置' component={UserSettings} renderLeftButton={<HeaderLeftBack />} />
                    <Scene key='modifyPwd' clone title='修改密码' component={ModifyPwd} renderLeftButton={<HeaderLeftBack />} />
                    <Scene key='teamSettings' clone title='队伍设置' component={TeamSettings} renderLeftButton={<HeaderLeftBack />} />
                    <Scene key='teamNameSettings' clone title='修改队伍名称' component={TeamNameSettings} renderLeftButton={<HeaderLeftBack />} />
                    <Scene key='userInfoSettings' clone title='简介' component={UserInfoSettings} renderLeftButton={<HeaderLeftBack />} />
                    <Scene key='scanScreen' clone title='扫码' component={ScanScreen} renderLeftButton={<HeaderLeftBack />} />
                    <Scene key='webView' clone component={WebView} renderLeftButton={<HeaderLeftBack />} />
                    <Drawer
                        key='drawerMenu'
                        hideNavBar
                        contentComponent={DrawerContent}
                        drawerWidth={styles.drawerWidth}
                        drawerIcon={<View style={{ padding: 2 }}><Image source={require('./assets/img/login_userid_white.png')} /></View>}
                        initial={isLogin}
                    >
                        <Stack key='mapRoot'>
                            <Scene key='map' component={map} />
                        </Stack>
                    </Drawer>
                </Stack>
            </Router>
        )
    }
}

export default RouterComponent
