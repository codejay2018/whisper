import { View, Text, Pressable, TextInput, ActivityIndicator, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useUsers } from '@/hooks/useUsers'
import { User } from '@/types'
import UserItem from '@/components/UserItem'
import { useGetOrCreateChat } from '@/hooks/useChats'

const NewChatScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { data: allUsers, isLoading, error } = useUsers();
  const {mutate: getOrCreateChat, isPending: isCreatingChat} = useGetOrCreateChat();

  // client-side search filtering
  const users = allUsers?.filter((user) => {
    if(!searchQuery.trim()) return true; // if search query is empty, show all users 
    const query = searchQuery.toLowerCase();
    return user.name?.toLowerCase().includes(query) || user.email?.toLowerCase().includes(query);
  });

  const handleUserSelect = (user: User) => {
    console.log('Selected user:', user);
    getOrCreateChat(user._id, {
      onSuccess: (chat) => {
        router.dismiss(); // Close the New Chat screen
        setTimeout(() => {
            router.push({
            pathname: '/chat/[id]',
            params: { 
              id: chat._id,
              participantId: chat.participant._id,
              name: chat.participant.name,
              avatar: chat.participant.avatar,
            }
          });
        }, 100);
      }
    }); 
  };

  return (
    <SafeAreaView className="flex-1 bg-black" edges={['top']}>
      <View className='flex-1 justify-end bg-black/50'>
        <View className='h-[90%] overflow-hidden bg-surface rounded-t-3xl' >
          <View className='border-b border-surface-light flex-row items-center px-5 pt-3 pb-3'>
            <Pressable 
              onPress={() => router.back()} 
              className='w-9 h-9 rounded-full items-center justify-center mr-2 bg-surface-card' >
              <Ionicons name="close" size={20} color="#f4a261" />
            </Pressable>
            <View className='flex-1'>
              <Text className='text-xl font-semibold text-foreground' >New Chat</Text>
              <Text className='text-xs text-muted-foreground mt-0.5' >Search for a User to start chatting</Text>
            </View>
          </View>
          {/* Search Bar */}
          <View className='px-5 pt-3 pb-2 bg-surface ' >
            <View className='bg-surface-card rounded-full px-3 py-1.5 gap-2 border border-surface-light flex-row items-center'>
              <Ionicons name="search" size={18} color="#6b6b70" />
              <TextInput
                placeholder="Search users..."
                placeholderTextColor="#6b6b70"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize='none'
                className='text-foreground text-sm flex-1'
              />
            </View>
          </View>
          {/* User List */}
          <View className='flex-1 bg-surface' >
            {isCreatingChat || isLoading ? (
              <View className='flex-1 items-center justify-center' >
                <ActivityIndicator size="large" color="#f4a261" />
              </View>
            ) : !users || users.length === 0 ? (
              <View className='flex-1 items-center justify-center px-5' >
                <Ionicons name="person-outline" size={64} color="#6b6b70" />
                <Text className='text-muted-foreground text-lg mt-4' >No users found.</Text>
                <Text className='text-subtitle-foreground text-sm mt-1 text-center' >Try a different search term</Text>
              </View>
            ) : (
              <ScrollView>  
                {users.map((user) => (
                  <UserItem 
                    key={user._id} 
                    user={user} 
                    isOnline={true}
                    onPress={() => handleUserSelect(user)} 
                  />
                ))}
              </ScrollView>
            )
          }
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default NewChatScreen