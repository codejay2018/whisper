import ChatItem from '@/components/ChatItem';
import EmptyUI from '@/components/EmptyUI';
import { useChats } from '@/hooks/useChats';
import { Chat } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text,  View, ActivityIndicator, FlatList, Pressable } from 'react-native'

const ChatsTab = () => {
  const router = useRouter();
  const { data: chats, isLoading, error, refetch } = useChats();
  if(isLoading) {
    return (
    <View className='flex-1 bg-surface items-center justify-center' >
      <ActivityIndicator size="large" color="#f4a261" />
    </View>
    )
  }

  if(error) {
    return (
      <View className='flex-1 bg-surface items-center justify-center' >
        <Text className='text-red-500 text-3xl' >Failed to load chats.</Text>
        <Pressable className='mt-4 px-4 py-2 bg-primary rounded-lg ' onPress={() => refetch()}>
          <Text className='text-foreground text-2xl' >Retry</Text>
        </Pressable>
      </View>
    )
  }

  const handleChatPress = (chat:Chat) => {
    router.push({
      pathname: "/chat/[id]",
      params: { 
        id: chat._id,
        participantId: chat.participant._id,
        name: chat.participant.name,
        avatar: chat.participant.avatar 
      }
    });
  };

  return (
    <View className='flex-1 bg-surface' >
      <FlatList
        data={chats}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ChatItem chat={item} onPress={ () => handleChatPress(item)} />
        )}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior='automatic'
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop:16, paddingBottom:24 }}
        ListHeaderComponent={<Header/>}
        ListEmptyComponent={<EmptyUI
          title="No chats yet"
          subtitle="Start a conversation!"
          iconName='chatbubbles-outline'
          iconColor='#6b6b70'
          buttonlabel='New Chat'
          onButtonPress={() => router.push('/new-chat')}
        />}
      />
    </View>
  )
}

export default ChatsTab;

function Header() {
  const router = useRouter();
  return (
    <View className='px-5 pt-2 pb-4'>
      <View className='flex-row items-center justify-between' >
        <Text className='text-2xl font-bold text-foreground' >Chats</Text>
        <Pressable 
          className=' size-10 bg-primary rounded-full items-center justify-center'
          onPress={() => router.push('/new-chat')}
        >
          <Ionicons name="create-outline" size={20} color="#0d0d0f" />
        </Pressable>
      </View>
    </View>
  )
}