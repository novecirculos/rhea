import { Platform } from 'react-native'

export type ShowWeb = boolean
const showWeb = Platform.OS === 'web'

export default showWeb
