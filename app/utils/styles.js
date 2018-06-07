import { Dimensions } from 'react-native'

export const pxToDp = uiElementPx => uiElementPx * Dimensions.get('window').width / 1080
