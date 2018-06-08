import { Component } from 'react'
// import { ScrollView, View, Text } from 'react-native'
import { connect } from 'react-redux'
// import styles from './style'
// import Player from '../../../components/player'

@connect(({ landMark, audioType }) => ({ ...landMark, ...audioType }))
class Post extends Component {
    render() {
        return null
        // let { intro, title, voices } = this.props
        // let { audioType } = this.props
        // // let uri = (() => {
        // //     let uri
        // //     voices.map(item => {
        // //         if (item.type === audioType) {
        // //             uri = item.src
        // //         }
        // //     })
        // //     return uri
        // // })()
        // return (
        //     <View style={styles.containers}>
        //         <View style={styles.player}>
        //             {/* <Player uri={encodeURI(uri)} /> */}
        //         </View>
        //         <View style={styles.main}>
        //             <View style={styles.title}>
        //                 <Text style={styles.titleText}>{title}</Text>
        //             </View>
        //             <ScrollView showsVerticalScrollIndicator style={styles.content}>
        //                 <Text style={styles.contentText}>{intro}</Text>
        //             </ScrollView>
        //         </View>
        //     </View>
        // )
    }
}

export default Post
