import React, { Component } from 'react'
import { ScrollView, View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { ActionSheet } from 'teaset'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker'

@connect(({ userInfo }) => ({ ...userInfo }))
class UserInfoSettings extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'userInfo/copyUserInfo'
        })
    }
    onSubmit = () => {
        this.props.dispatch({
            type: 'userInfo/editUser',
            payload: {
                id: this.props.userInfo.id,
                nickName: this.props.nickName,
                sex: this.props.sex,
                avatar: this.props.avatar
            }
        })
    }

    onChangeNickName = (e) => {
        this.props.dispatch({
            type: 'userInfo/putNickName',
            payload: {
                nickName: e
            }
        })
    }

    onChooseSex = () => {
        let items = [
            {
                title: '男',
                onPress: () => {
                    this.props.dispatch({
                        type: 'userInfo/putSex',
                        payload: {
                            sex: '男'
                        }
                    })
                }
            },
            {
                title: '女',
                onPress: () => {
                    this.props.dispatch({
                        type: 'userInfo/putSex',
                        payload: {
                            sex: '女'
                        }
                    })
                }
            }
        ]
        let cancelItem = { title: 'Cancel' }
        ActionSheet.show(items, cancelItem)
    }

    onChangeAvatar = () => {
        let items = [
            {
                title: '相册',
                onPress: () => {
                    this.onPickerFromLibrary()
                }
            },
            {
                title: '拍照',
                onPress: () => {
                    this.onPickerFromCamera()
                }
            }
        ]
        let cancelItem = { title: 'Cancel' }
        ActionSheet.show(items, cancelItem)
    }

    onPickerFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true
        }).then(image => {
            this.props.dispatch({
                type: 'userInfo/putAvatarSource',
                payload: {
                    uri: image.path
                }
            })
            let data = {
                uri: image.path,
                type: 'image/jpeg',
                name: `${Math.random()}.jpg`
            }
            this.props.dispatch({
                type: 'userInfo/uploadImg',
                payload: {
                    file: data
                }
            })
        }).catch(err => {
            console.log(err)
        })
    }

    onPickerFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true
        }).then(image => {
            this.props.dispatch({
                type: 'userInfo/putAvatarSource',
                payload: {
                    uri: image.path
                }
            })
            let data = {
                uri: image.path,
                type: 'image/jpeg',
                name: `${Math.random()}.jpg`
            }
            this.props.dispatch({
                type: 'userInfo/uploadImg',
                payload: {
                    file: data
                }
            })
        })
    }

    renderAvatar = () => {
        if (!this.props.avatarSource) return <Image source={require('../../assets/img/icon_user.png')} />
        return <Image style={{ height: 60, width: 60, marginRight: 15 }} source={{ uri: this.props.avatarSource }} />
    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: '#f4f4f4' }}>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', marginVertical: 5 }}
                    onPress={() => this.onChangeAvatar()}>
                    <Text style={{ margin: 15, alignSelf: 'center' }}>头像 </Text>
                    {this.renderAvatar()}
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', marginVertical: 5 }}>
                    <Text style={{ margin: 15 }}>昵称 </Text>
                    <TextInput maxLength={20} underlineColorAndroid='transparent' placeholder='请输入昵称' style={{ color: '#666666', marginRight: 15, textAlign: 'right' }} value={this.props.nickName} onChangeText={(e) => this.onChangeNickName(e)} />
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', marginVertical: 5 }} onPress={() => this.onChooseSex()}>
                    <Text style={{ margin: 15 }}>性别 </Text>
                    <Text style={{ color: '#666666', margin: 15 }}>{this.props.sex}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#14BBFD', borderRadius: 15, marginHorizontal: 15, overflow: 'hidden', marginTop: 30 }} onPress={() => this.onSubmit()}>
                    <Text style={{ textAlign: 'center', margin: 10, color: 'white' }}>提交</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

export default UserInfoSettings
