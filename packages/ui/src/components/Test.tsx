import { styled } from 'nativewind'
import { Text as RNText, View as RNView } from 'react-native'

const Text = styled(RNText)
const View = styled(RNView)

export const TestComponent = () => {
  return (
    <View className="bg-primary-900 flex w-full flex-1 flex-row justify-center">
      <Text className="text-primary">Test</Text>
    </View>
  )
}
