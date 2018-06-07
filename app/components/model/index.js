import React, { Component } from 'react'
import { TouchableOpacity, Text, View, Modal, ViewPropTypes } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'
import styles from './style'

class Modals extends Component {
    static propTypes = {
        ...ViewPropTypes,
        icon: PropTypes.element,
        onClose: PropTypes.func,
        title: PropTypes.string,
        isShowClose: PropTypes.bool,
        visible: PropTypes.bool,
        content: PropTypes.element,
        botton: PropTypes.array
    }

    state = {
        isShow: false
    }

    onClose = () => {
        this.props.onClose(false)
    }

    render() {
        let { title, isShowClose, visible, content, botton, icon } = this.props
        if (!visible) return null
        return (
            <Modal
                visible={visible}
                transparent
                onRequestClose={() => { }}
                animationType={'fade'}
            >
                <View style={[styles.container]}>
                    <View style={[styles.innerContainer]}>
                        {
                            title && (
                                <View style={styles.modelTitle}>
                                    <View style={styles.modelTitleTextWrap} >
                                        {
                                            icon
                                        }
                                        <Text style={styles.modelTitleText}>{title}</Text>
                                    </View>
                                    {isShowClose && (
                                        <TouchableOpacity style={styles.modelTitleCloseWrap} onPress={() => this.onClose()} >
                                            <Icon style={styles.modelTitleClose} name='ios-close' />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )
                        }
                        <View style={styles.modelWrap}>
                            {content}
                        </View>
                        {
                            botton && (
                                <View style={styles.bottonWrap}>
                                    <View style={styles.bottonMain}>
                                        {
                                            botton.map((item, index) => {
                                                let color = item.color ? [styles.bottonText, { color: item.color }] : styles.bottonText
                                                return (
                                                    <TouchableOpacity key={index} onPress={() => item.callback()}>
                                                        <Text style={color}>{item.text}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                            )
                        }
                    </View>
                    <TouchableOpacity activeOpacity={1} style={styles.mask} onPress={() => this.onClose()} />
                </View>
            </Modal>
        )
    }
}

export default Modals
