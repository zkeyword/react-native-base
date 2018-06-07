import SockJS from './sockjs.min.js'
import Stomp from 'stompjs'
import { url } from '../config'

export default function stompClient() {
    let stompClient = null
    let socket = new SockJS(`${url}:11001/endpointDynamax`)
    stompClient = Stomp.over(socket)
    return stompClient
}
