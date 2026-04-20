import { View, Text, Dimensions, Pressable, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import useSocialAuth from '@/hooks/useSocialAuth';

const {width, height} = Dimensions.get('window');

const AuthScreen = () => {
  const { handleSocialAuth, loadingStrategy } = useSocialAuth();
  
  return (
    <View className='flex-1 bg-surface-dark ' >
      {/* todo : animated orbs */}
      <View className='absolute inset-0 overflow-hidden' ></View>

      <SafeAreaView className='flex-1'>
        {/* top section - branding */}
        <View className='items-center pt-10'>
          <Image 
            source={require('../../assets/images/logo.png')} 
            style={{ width: 100, height: 100, marginVertical: -20 }} 
            contentFit='contain'
          />
          <Text className='text-primary font-serif tracking-wider uppercase text-4xl font-bold' >Whisper</Text>
        </View>
        {/* center section - hero image */}
        <View className='flex-1 justify-center items-center px-6' >
          <Image
            source={require('../../assets/images/auth.png')}
            style={{ width: width * 0.8, height: height * 0.4 }}
            contentFit='contain'
          />
          {/* Headline */}
          <View className='items-center mt-6'>
            <Text
              className='text-foreground text-center font-sans text-5xl font-bold'
            >Connect & Chat</Text>
            <Text
              className='text-primary font-mono font-bold text-3xl'
            >Seamlessly</Text>
          </View>
          {/* auth buttons */}
          <View className='flex-row gap-4 mt-10'>
            {/* google btn */}
            <Pressable
              className='flex-1 flex-row items-center justify-center gap-2  bg-white/95 py-4 rounded-2xl active:scale-95 '
              disabled={loadingStrategy === 'oauth_google'}
              onPress={()=>handleSocialAuth('oauth_google')}
            >
              {loadingStrategy === 'oauth_google' ? (
                <ActivityIndicator size='small' color='#1a1a1a'/>
              ) : (<>
                <Image
                  source={require('../../assets/images/google.png')}
                  style={{ width: 20, height: 20 }}
                  contentFit='contain'
                />
                <Text className='text-gray-900 font-semibold text-sm'>Google</Text>
              </>)}
            </Pressable>            
            {/* apple btn */}
            <Pressable
              className='flex-1 flex-row items-center justify-center gap-2  bg-white/10 border border-white/20 py-4 rounded-2xl active:scale-95 '
              disabled={loadingStrategy === 'oauth_apple'}
              onPress={()=>handleSocialAuth('oauth_apple')}
            >
              {loadingStrategy === 'oauth_apple' ? (
                <ActivityIndicator size='small' color='#ffffff'/>
              ) : (<>
                <Ionicons name='logo-apple' size={20} color={'#ffffff'}/>
                <Text className='text-foreground font-semibold text-sm'>Apple</Text>
              </>)}              

            </Pressable>
          </View>
        </View>

      </SafeAreaView>
    </View>
  )
}

export default AuthScreen