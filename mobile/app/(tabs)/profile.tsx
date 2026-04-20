import { useAuth } from '@clerk/expo'
import { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native'

const ProfileTab = () => {
  const { signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out failed:', error);
      // Show user-friendly error message
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <ScrollView className='bg-surface' 
      contentInsetAdjustmentBehavior="automatic">
      <Text className='text-white text-5xl' >Profile Tab</Text>
      <Pressable 
        className='mt-4 px-4 py-2 bg-red-600 rounded-lg' 
        disabled={isSigningOut}
        onPress={handleSignOut}>
        <Text className='text-white font-medium'>Sign Out</Text>
      </Pressable>
    </ScrollView>
  )
}

export default ProfileTab