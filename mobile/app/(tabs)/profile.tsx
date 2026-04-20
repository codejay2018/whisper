import { useAuth } from '@clerk/expo'
import { View, Text, ScrollView, Pressable } from 'react-native'

const ProfileTab = () => {
   const {signOut} = useAuth();
  return (
    <ScrollView className='bg-surface' 
      contentInsetAdjustmentBehavior="automatic">
      <Text className='text-white text-5xl' >Profile Tab</Text>
      <Pressable 
        className='mt-4 px-4 py-2 bg-red-600 rounded-lg' 
        onPress={()=>signOut()}>
        <Text className='text-white font-medium'>Sign Out</Text>
      </Pressable>
    </ScrollView>
  )
}

export default ProfileTab