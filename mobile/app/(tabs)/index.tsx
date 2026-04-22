import { Text, ScrollView } from 'react-native'
// import * as Sentry from '@sentry/react-native';

const ChatsTab = () => {
  return (
    <ScrollView className='bg-surface' 
      contentInsetAdjustmentBehavior="automatic">
      <Text className='text-white text-5xl' >ChatsTab</Text>
      {/* <Button title='Try!' onPress={ () => { Sentry.captureException(new Error('First error')) }}/> */}
    </ScrollView>
  )
}

export default ChatsTab 