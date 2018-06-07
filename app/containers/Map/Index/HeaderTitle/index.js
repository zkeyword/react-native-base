import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { CachedImage } from 'react-native-img-cache'

import HTMLView from 'react-native-htmlview'
import { format } from '../../../../utils/time'
import HeaderTitle from '../../../../components/headerTitle'
import Modal from '../../../../components/model'
import Player from '../../../../components/player'
import styles from './style'

@connect(({ map, audioType }) => ({ ...map, ...audioType }))
class CustomHeaderTitle extends Component {
    state = {
        isShow: false
    }

    componentDidMount = async() => {
        this.props.dispatch({
            type: 'map/getScenics'
        })
    }

    onClose = isShow => {
        this.setState({
            isShow
        })
    }

    handlePress = () => {
        this.setState({
            isShow: true
        })
    }

    formatData = (date) => {
        return format(date, 'HH:mm')
    }

    renderModelContent = data => {
        let { audioType } = this.props
        let uri = (() => {
            let uri
            data.voices.map(item => {
                if (item.type === audioType) {
                    uri = item.src
                }
            })
            return uri
        })()
        return data && (
            <View style={styles.modelWrap}>
                <ScrollView contentContainerStyle={styles.modelImagesWrap} horizontal showsHorizontalScrollIndicator >
                    {
                        data.pictures.map((item, index) => {
                            let arr = [styles.modelImageItem]
                            if (!index) arr.push(styles.modelImageItemFirst)
                            return <View key={index} style={arr}><CachedImage style={styles.modelImage} source={{ uri: item }} /></View>
                        })
                    }
                </ScrollView>
                <ScrollView style={styles.modelTextWrap} showsHorizontalScrollIndicator>
                    <View style={styles.modelText}>
                        <HTMLView value={data.intro} addLineBreaks={false} />
                    </View>
                </ScrollView>
                <View style={styles.modelAddress}>
                    <Text>景区地址：{data.location}</Text>
                </View>
                <View style={styles.modelOpenTime}>
                    <Text>开放时间：{format(data.wt.openTime, 'HH:mm')}~{format(data.wt.closeTime, 'HH:mm')}</Text>
                </View>
                <Player uri={encodeURI(uri)} />
            </View>
        )
    }

    renderModel = scenicsData => {
        return (
            <Modal
                title={scenicsData.name}
                isShowClose
                onClose={this.onClose}
                visible={this.state.isShow}
                content={this.renderModelContent(scenicsData)}
            />
        )
    }

    handlePress = () => {
        this.setState({
            isShow: true
        })
    }

    render() {
        let { scenicsData } = this.props
        if (!scenicsData) return null
        return (
            <HeaderTitle title={scenicsData.name} handlePress={this.handlePress} content={this.renderModel(scenicsData)} />
        )
    }
}
export default CustomHeaderTitle
