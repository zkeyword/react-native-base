import React, { Component } from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { PopoverPicker } from 'teaset'
import { connect } from 'react-redux'

@connect(({ landMark }) => ({ ...landMark }))
class Route extends Component {
    constructor(props) {
        super(props)
        this.polylineNameArr = []
    }

    componentDidMount() {
        this.props.dispatch({ type: 'landMark/getRouteNameList' })
    }

    showRouteNamePopover(view) {
        this.props.dispatch({ type: 'landMark/getRouteNameList' })

        if (this.polylineNameArr.length === 0) {
            this.props.polylineArr.map((item, index) => {
                this.polylineNameArr.push(item.name)
            })
        }
        view.measure((x, y, width, height, pageX, pageY) => {
            PopoverPicker.show(
                { x: pageX, y: pageY, width, height },
                this.polylineNameArr,
                null,
                (item, index) => {
                    this.props.dispatch({
                        type: 'landMark/getRouteInfoById',
                        payload: {
                            tourRouteId: this.props.polylineArr[index].id
                        }
                    })
                },
                {
                    align: 'end',
                    showArrow: true,
                    alignInsets: -10
                }
            )
        })
    }

    render() {
        return (
            <TouchableOpacity ref='routeIcon' onPress={() => this.showRouteNamePopover(this.refs['routeIcon'])}>
                <Image source={require('./img/map_btn_route_normal.png')} />
            </TouchableOpacity>
        )
    }
}

export default Route
