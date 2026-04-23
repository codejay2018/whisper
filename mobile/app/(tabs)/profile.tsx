import { useAuth, useUser } from '@clerk/expo'
import { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native'

import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';


const MENU_SECTIONS = [
  {
    title: 'Account',
    items: [
      { icon: 'person-outline', label: 'Edit Profile', color:'#f4a261' },
      { icon: 'shield-checkmark-outline', label: 'Privacy & Security', color:'#10b981' },
      { icon: 'notifications-outline', label: 'Notifications', color:'#8b5cf6', value: 'On' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: 'moon-outline', label: 'Dark Mode', color:'#6366f1', value: 'On' },
      { icon: 'language-outline', label: 'Language', color:'#ec4899', value: 'English' },
      { icon: 'cloud-outline', label: 'Data & Storage', color:'#14b8a6', value: '1.2 GB' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: 'help-circle-outline', label: 'Help Center', color:'#f59e0b' },
      { icon: 'chatbubbles-outline', label: 'Contact Us', color:'#3b82f6' },
      { icon: 'star-outline', label: 'Rate the App', color:'#f4a261' },
    ],
  },  
];

const ProfileTab = () => {
  const { signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { user } = useUser();

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

  if(!user) {
    return (
      <ScrollView 
        className='bg-surface' 
        contentInsetAdjustmentBehavior="automatic" 
        showsVerticalScrollIndicator={false}>
        <View className='items-center mt-32 px-6'>
          <Text className='text-foreground text-2xl font-semibold'>Profile unavailable</Text>
          <Text className='text-muted-foreground mt-2 text-center'>Please sign in to view your profile details.</Text>
        </View>
      </ScrollView>
    );    
  }

  return (
    <ScrollView 
      className='bg-surface' 
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      // indicatorStyle='white'
      contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View className='relative'>
          <View className='items-center mt-10'>
            {/* portrait */}
            <View className='relative'>
              <View className='rounded-full border-2 border-primary'>
                <Image source={user?.imageUrl} style={{ width: 100, height: 100, borderRadius: 999 }} />
              </View>
              <Pressable className='absolute bottom-1 right-0 w-10 h-10 bg-primary rounded-full items-center justify-center border-2 border-surface-dark'>
                <Ionicons name="camera" size={24} color="#0d0d0f" />
              </Pressable>              
            </View>
            {/* name & email */}
            <Text className='text-foreground text-2xl font-bold mt-4'>{user?.firstName} {user?.lastName}</Text>
            <Text className='text-muted-foreground mt-1'>{user?.emailAddresses[0]?.emailAddress}</Text>
            {/* online offline status */}
            <View className='flex-row items-center mt-3 bg-green-500/20 px-3 py-1.5 rounded-full'>
              <View className='w-2 h-2 bg-green-500 rounded-full mr-2'></View>
              <Text className='text-green-500 text-sm font-medium'>Online</Text>
            </View>
          </View>
        </View>
        {/* menu sections */}
        {MENU_SECTIONS.map((section) => (
          <View key={section.title} className='mt-6 mx-5' >
            <Text className='text-foreground/60 uppercase text-xs font-semibold mb-2 ml-1 tracking-wider'>{section.title}</Text>
            <View className='bg-surface-card rounded-2xl overflow-hidden'>
              {section.items.map((item, index) => (
                <Pressable
                  key={item.label}
                  className={`flex-row items-center px-4 py-3.5 active:bg-surface-light ${
                    index < section.items.length - 1 ? 'border-b border-surface-light' : ''
                  }`}
                >
                  <View
                    className='w-9 h-9 rounded-xl items-center justify-center'
                    style={{ backgroundColor: `${item.color}30` }}
                  >
                    <Ionicons name={item.icon as any} size={20} color={item.color} />
                  </View>
                  <Text className='text-foreground font-medium ml-3 flex-1'>{item.label}</Text>
                  {item.value && <Text className='text-muted-foreground text-sm mr-1'>{item.value}</Text>}
                  <Ionicons name="chevron-forward" size={18} color="#6b6b70" />
                </Pressable>
              ))}
            </View>
          </View>
        ))}
        {/* sign out button */}
        <Pressable 
          onPress={handleSignOut}
          className='items-center bg-red-500/10 rounded-2xl border border-red-500/20 mx-5 mt-8 py-4 active:opacity-70'>
          <View className='flex-row'>
            <Ionicons name='log-out-outline' size={20} color='#ef4444' />
            <Text className='text-red-500 ml-2 font-semibold'>Log Out</Text>
          </View>
        </Pressable>
    </ScrollView>
  )
}

export default ProfileTab