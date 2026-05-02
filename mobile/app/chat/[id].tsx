import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router';
import { useCurrentUser } from '@/hooks/useAuth';
import { useMessages } from '@/hooks/useMessages';
import { useSocketStore } from '@/lib/socket';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import EmptyUI from '@/components/EmptyUI';
import { MessageSender } from '@/types';
import MessageBubble from '@/components/MessageBubble';

type ChatParams = {
  id:string;
  participantId:string;
  name:string;
  avatar:string;
};

const ChatDetailScreen = () => {

  const {id: chatId, avatar, name, participantId} = useLocalSearchParams<ChatParams>();
  const [messageText, setMessageText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const {data:currentUser} = useCurrentUser();
  const {data:messages, isLoading} = useMessages(chatId);
  const {
    joinChat,
    leaveChat,
    sendMessage,
    sendTyping,
    isConnected,
    onlineUsers,
    typingUsers
  } = useSocketStore();

  const isOnline = participantId ? onlineUsers.has(participantId) : false;
  const isTyping = typingUsers.get(chatId) === participantId;

  const typingTimeoutRef = useRef< ReturnType<typeof setTimeout> |null>(null);

  // joing chat room on mount, leave on unmount
  useEffect(()=>{
    if(chatId && isConnected){
      joinChat(chatId);
    }
    return ()=>{
      if(chatId){
        leaveChat(chatId);
      }
    };
  }, [chatId, isConnected, joinChat, leaveChat]);
  
  // scroll to bottom when new messages arrive
  useEffect(()=>{
    if(messages && messages.length > 0){
      setTimeout(()=>{
        scrollViewRef.current?.scrollToEnd({animated:true});
      }, 100);
    }
  }, [messages]);

  const handleTyping = useCallback((text:string)=>{
    setMessageText(text);

    if(!isConnected || !chatId){
      return;
    }

    // send typing start
    if(text.length > 0){
      sendTyping(chatId, true);

      // clear existing timeout
      if(typingTimeoutRef.current){
        clearTimeout(typingTimeoutRef.current);
      }

      // stop typing after 2 seconds of no input
      typingTimeoutRef.current = setTimeout(() => {
        sendTyping(chatId, false);
      }, 2000);

    }else{
      // text cleard, stop typing
      if(typingTimeoutRef.current){
        clearTimeout(typingTimeoutRef.current);
      }

      sendTyping(chatId, false);
    }
  }, [chatId, isConnected, sendTyping]);

  const handleSend = () =>{
    if(!messageText.trim()
    || isSending
    || !isConnected
    || !currentUser
    ){ return; }

    // stop typing indicator
    if(typingTimeoutRef.current){
      clearTimeout(typingTimeoutRef.current);
    }

    sendTyping(chatId, false);
    setIsSending(true);
    sendMessage(chatId, messageText.trim(), {
      _id:currentUser._id,
      name:currentUser.name,
      email:currentUser.email,
      avatar:currentUser.avatar
    });
    setMessageText("");
    setIsSending(false);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({animated:true});
    }, 100);

  };

  return (
    <SafeAreaView className='flex-1 bg-surface ' edges={["top", 'bottom']}>
      {/* Header */}
      <View className='flex-row items-center px-4 py-2 border-b border-surface-light'>
        <Pressable onPress={()=>router.back()}>
          <Ionicons name='arrow-back' size={24} color='#f4a261' />
        </Pressable>
        <View className='flex-row items-center flex-1 ml-2'>
          {avatar && <Image source={avatar} style={{width:40, height:40, borderRadius:999}}/>}
          <View className='ml-3'>
            <Text className='text-foreground font-semibold text-base' numberOfLines={1}>{name}</Text>
            <Text className={`text-xs ${isTyping ? "text-primary" : "text-muted-foreground"}`}>
              {isTyping ? 'Typing...' : isOnline ? 'Online' : 'Offline' }</Text>
          </View>
        </View>
        <View className='flex-row items-center gap-3'>
          <Pressable className='w-9 h-9 rounded-full items-center justify-center'>
            <Ionicons name='call-outline' size={20} color='#a0a0a5'/>
          </Pressable>
          <Pressable className='w-9 h-9 rounded-full items-center justify-center'>
            <Ionicons name='videocam-outline' size={20} color='#a0a0a5'/>
          </Pressable>
        </View>
      </View>

      {/* Message + keyboard input */}
      <KeyboardAvoidingView
        className='flex-1'
        behavior={Platform.OS === 'ios' ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <View className='flex-1 bg-surface'>
          {isLoading ? (
            <View className='flex-1 items-center justify-center'>
              <ActivityIndicator size='large' color='#f4a261'/>
            </View>
          ) : !messages || messages.length === 0 ? (
            <EmptyUI
              title='No messages yet'
              subtitle='Start the conversation!'
              iconName='chatbubbles-outline'
              iconColor='#6b6b70'
              iconsize={64}
            />
          ) : (
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={{paddingHorizontal:16, paddingVertical:12, gap:8}}
              onContentSizeChange={()=>{
                scrollViewRef.current?.scrollToEnd({animated:false});
              }}
            >
              {
                messages.map((message)=>{
                  const senderId = (message.sender as MessageSender)._id;
                  const isFromMe = currentUser ? currentUser._id === senderId : false;
                  return <MessageBubble
                    key = {message._id}
                    message = {message}
                    isFromMe = { isFromMe}
                  />
                })
              }
            </ScrollView>
          )}

          {/* Input Bar */}
          <View className='border-t border-t-surface-light px-3 pb-3 pt-2'>
            <View className='flex-row items-end bg-surface-card rounded-3xl px-3 py-1.5 gap-2'>
              <Pressable className='w-8 h-8 rounded-full items-center justify-center'>
                <Ionicons name='add' size={22} color='#f4a261'/>
              </Pressable>
              <TextInput
                placeholder='Type a message'
                placeholderTextColor='#6b6b70'
                className='flex-1 text-foreground text-sm mb-2'
                multiline
                style={{maxHeight:100}}
                value={messageText}
                onChangeText={handleTyping}
                onSubmitEditing={handleSend}
                editable={!isSending}
              />
              <Pressable 
                className='w-8 h-8 bg-primary items-center justify-center rounded-full'
                onPress={handleSend}
                disabled={!messageText.trim() || isSending}
              >
                {isSending ? (
                  <ActivityIndicator size='small' color='#0d0d0f'/>
                ) : (
                  <Ionicons name='send' size={18} color='#0d0d0f'/>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}


export default ChatDetailScreen 