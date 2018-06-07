/* @flow */

import * as React from 'react'
import { Modal, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import * as styles from './ProgressStyle'

export class ProgressView extends React.Component {
    static propTypes = {
        //   style: View.propTypes.style,
        visible: PropTypes.bool.isRequired,
        progress: PropTypes.number.isRequired
    };
    static defaultProps = {
        visible: false,
        progress: 0
    };

    state = {};

    componentDidMount() {

    }

    render() {
        const { visible, style, progress } = this.props
        const percent = Math.floor(progress * 100)
        return (
            <Modal
                animationType={'none'}
                transparent
                onRequestClose={() => { }}
                visible={visible}>
                <View style={styles.progress.modalContainer}>
                    <View>
                        <View style={[styles.progress.barContainer, style]}>
                            <View style={[styles.progress.barPercent, { width: `${percent}%` }]} />
                        </View>
                        <Text style={styles.progress.text}>
                            {`... ${percent}%`}
                        </Text>
                    </View>
                </View>
            </Modal>
        )
    }
}
