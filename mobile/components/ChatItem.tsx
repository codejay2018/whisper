import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Chat } from '@/types';
import { Image } from 'expo-image';
import { formatDistanceToNow, isValid, parseISO } from 'date-fns';

const ChatItem = ({chat, onPress}: { chat: Chat; onPress: () => void }) => {

  const participant =  chat.participants;
  const isOnline = true;
  const isTyping = false;
  const hasUnread = false;
   // Assuming the first participant is the one to display, adjust as needed

  return (
    <Pressable onPress={onPress} className='flex-row items-center py-3 active:opacity-70' >
      {/* avatar & online indicator */}
      <View className='relative' >
        <Image source={participant.avatar} style={{ width: 56, height: 56, borderRadius: 999 }} />
        {isOnline && <View className='absolute bottom-0 right-0 size-4 bg-green-500 rounded-full border-[3px] border-surface' />}
      </View>

      {/* chat info */}
      <View className='flex-1 ml-4' >
        <View className='flex-row items-center justify-between'>
          <Text className={`text-base font-medium ${hasUnread ? 'text-primary' : 'text-foreground'}`} >
            {participant.name}
          </Text>
          <View className='flex-row items-center gap-2' >
            {hasUnread && <View className='w-2.5 h-2.5 bg-primary rounded-full' />}
            <Text className='text-xs text-subtitle-foreground' >
              {chat.lastMessageAt && isValid(parseISO(chat.lastMessageAt))
                ? formatDistanceToNow(parseISO(chat.lastMessageAt), { addSuffix: false })
                : "No messages yet"}              
            </Text>
          </View>
        </View>

        <View>
          {isTyping 
          ? (
            <Text className='text-sm text-primary italic'>typing...</Text>
          )
          : (
            // <Text className={`text-sm flex-1 mr-3 ${hasUnread ? 'text-foreground font-medium' : 'text-subtitle-foreground'}`} numberOfLines={1} >
            //   {chat.lastMessage?.text || "No messages yet"}
            // </Text>

            <Text className={`text-sm flex-1 mr-3 ${aaa(hasUnread)}`} >
               {chat.lastMessage?.text || "No messages yet"}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  )
}

function aaa(hasUnread: boolean) {
  return hasUnread ? 'text-foreground font-medium' : 'text-subtitle-foreground';
}

export default ChatItem