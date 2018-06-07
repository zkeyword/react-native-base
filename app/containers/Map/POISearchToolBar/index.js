import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import { SearchBar } from 'antd-mobile'
import { connect } from 'react-redux'
import Tween from '../../../utils/tween'
import styles from './style'

@connect(({ landMark }) => ({ ...landMark }))
class POISearchToolBar extends Component {
    constructor(props) {
        super(props)
        this.keyboardHeight = 0
        this.state = {
            expandHeight: 56,
            isExpand: false,
            isAnimatedIng: false,
            height: 56,
            isUp: true,
            searchKeyword: ''
        }
    }

    componentDidMount() {
        this.switchToType(this.props.currentLandmarkType)
        this.props.dispatch({
            type: 'landMark/getLandMarkType'
        })
    }

    switchToType = (type) => {
        this.props.dispatch({
            type: 'landMark/getLandMarkPOI',
            payload: {
                page: 0,
                size: 100,
                landmarkType: type,
                landmarkName: ''
            }
        })
        this.props.dispatch({
            type: 'landMark/modifyCurrentSelectLandMarkType',
            payload: {
                type
            }
        })
        this.props.dispatch({
            type: 'landMark/setState',
            payload: {
                routeInfo: {},
                isNavigator: false
            }
        })
    }

    onChangeSearchBar = (e) => {
        this.setState({ searchKeyword: e })
        this.props.dispatch({
            type: 'landMark/modifyKeyword',
            payload: {
                searchKeyword: e
            }
        })
        this.props.dispatch({
            type: 'landMark/filterPOIArrToPOIArrDuplicate',
            payload: {
                POIArr: this.props.POIArr,
                searchKeyword: e
            }
        })
    }

    onCancelSearchBar = e => {
        this.onChangeSearchBar('')
    }

    onPOIPress = (location) => {
        var lat = Number(location.latitude)
        var lng = Number(location.longitude)

        this.props.mapView.animateTo({
            coordinate: {
                latitude: lat,
                longitude: lng
            }

        }, Number(200), true)
    }

    renderItemView = (item, index) => {
        var icon
        switch (item.type) {
            case 'SCENIC':
                icon = require('./img/map_btn_scenic-spots_selected.png')
                break
            case 'FOOD':
                icon = require('./img/map_btn_shop_selected.png')
                break
            case 'GUEST_CENTER':
                icon = require('./img/map_btn_visitor-center_selected.png')
                break
            case 'TOILET':
                icon = require('./img/map_btn_toilet_selected.png')
                break
            case 'GATEWAY':
                icon = require('./img/map_btn_passageway_selected.png')
                break
            case 'BUS_STATION':
                icon = require('./img/map_btn_bus_selected.png')
                break
            case 'CHAIR':
                icon = require('./img/map_btn_chair_selected.png')
                break
            case 'OTHER':
                icon = require('./img/map_btn_other_selected.png')
                break
            default:
                break
        }
        return (
            <TouchableOpacity key={index} style={{ flexDirection: 'row', marginVertical: 5 }} onPress={() => this.onPOIPress(item.location)}>
                <Image style={{ marginLeft: 15 }} source={icon} />
                <Text style={{ alignSelf: 'center', marginLeft: 15 }}>{item.name} </Text>
            </TouchableOpacity>
        )
    }

    animation = (start, begin, end, during, callback) => {
        var step = () => {
            var height = Tween.Linear(start, begin, end, during)
            this.refs.View.setNativeProps({
                style: {
                    height
                }
            })
            start++
            if (start <= during) {
                setTimeout(step, 0)
            } else {
                callback && callback()
            }
        }
        step()
    }

    startAnimation = () => {
        if (this.state.isAnimatedIng) return
        this.setState({
            isAnimatedIng: true
        }, () => {
            if (this.state.isUp) {
                this.animation(0, 56, 240, 15, () => {
                    this.setState({
                        isExpand: true,
                        isAnimatedIng: false,
                        isUp: false
                    })
                })
            } else {
                this.animation(0, 55, 1, 20, () => {
                    this.setState({
                        isExpand: false,
                        isAnimatedIng: false,
                        isUp: true
                    })
                })
            }
        })
    }

    render() {
        return (
            <View ref='View' style={[styles.tabBarWrap, { height: this.state.height }]} >
                <View style={styles.tabBar}>
                    <ScrollView contentContainerStyle={{ marginHorizontal: 5 }} showsHorizontalScrollIndicator={false} horizontal>
                        <TouchableOpacity style={styles.tabBarItem} onPress={() => this.switchToType('SCENIC')}>
                            <Image style={styles.tabBarItemIcon} source={(this.props.currentLandmarkType === 'SCENIC') ? require('./img/map_btn_scenic-spots_selected.png') : require('./img/map_btn_scenic-spots_normal.png')} />
                            <Text style={styles.tabBarItemText}> 景点 </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tabBarItem} onPress={() => this.switchToType('FOOD')}>
                            <Image style={{ width: 30, height: 30 }} source={(this.props.currentLandmarkType === 'FOOD') ? require('./img/map_btn_shop_selected.png') : require('./img/map_btn_shop_normal.png')} />
                            <Text style={styles.tabBarItemText}>美食 </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tabBarItem} onPress={() => this.switchToType('GUEST_CENTER')}>
                            <Image style={{ width: 30, height: 30 }} source={(this.props.currentLandmarkType === 'GUEST_CENTER') ? require('./img/map_btn_visitor-center_selected.png') : require('./img/map_btn_visitor-center_normal.png')} />
                            <Text style={styles.tabBarItemText}>游客中心 </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tabBarItem} onPress={() => this.switchToType('TOILET')}>
                            <Image style={{ width: 30, height: 30 }} source={(this.props.currentLandmarkType === 'TOILET') ? require('./img/map_btn_toilet_selected.png') : require('./img/map_btn_toilet_normal.png')} />
                            <Text style={styles.tabBarItemText}>厕所 </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tabBarItem} onPress={() => this.switchToType('GATEWAY')}>
                            <Image style={{ width: 30, height: 30 }} source={(this.props.currentLandmarkType === 'GATEWAY') ? require('./img/map_btn_passageway_selected.png') : require('./img/map_btn_passageway_normal.png')} />
                            <Text style={styles.tabBarItemText}>出入口 </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tabBarItem} onPress={() => this.switchToType('BUS_STATION')}>
                            <Image style={{ width: 30, height: 30 }} source={(this.props.currentLandmarkType === 'BUS_STATION') ? require('./img/map_btn_bus_selected.png') : require('./img/map_btn_bus_normal.png')} />
                            <Text style={styles.tabBarItemText}>公交站 </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tabBarItem} onPress={() => this.switchToType('CHAIR')}>
                            <Image style={{ width: 30, height: 30 }} source={(this.props.currentLandmarkType === 'CHAIR') ? require('./img/map_btn_chair_selected.png') : require('./img/map_btn_chair_normal.png')} />
                            <Text style={styles.tabBarItemText}>座椅 </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tabBarItem} onPress={() => this.switchToType('OTHER')}>
                            <Image style={{ width: 30, height: 30 }} source={(this.props.currentLandmarkType === 'OTHER') ? require('./img/map_btn_other_selected.png') : require('./img/map_btn_other_normal.png')} />
                            <Text style={styles.tabBarItemText}>其他 </Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => this.startAnimation()} >
                        <Image style={{ marginHorizontal: 15 }} source={this.state.isExpand ? require('./img/search_arrow_down.png') : require('./img/search_arrow_up.png')} />
                    </TouchableOpacity>
                </View>
                <View>
                    <SearchBar value={this.state.searchKeyword} placeholder='搜索' onChange={e => this.onChangeSearchBar(e)} onCancel={e => this.onCancelSearchBar(e)} />
                </View>
                <FlatList
                    data={(this.props.searchKeyword.length !== 0) ? this.props.duplicatePOIArr : this.props.POIArr}
                    renderItem={({ item, index }) => this.renderItemView(item, index)}
                />
            </View >
        )
    }
}

export default POISearchToolBar
