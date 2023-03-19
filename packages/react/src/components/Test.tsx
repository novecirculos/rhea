import { styled } from 'nativewind'
import { Text as RNText, View } from 'react-native'

const Text = styled(RNText)

export const TestComponent = () => {
  return (
    <View>
      <Text className="text-primary">Test</Text>
    </View>
  )
}
