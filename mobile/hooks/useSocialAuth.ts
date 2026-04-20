import { useSSO } from "@clerk/expo";
import { useRef, useState } from "react";
import { Alert } from "react-native";

function useSocialAuth() {
    const [loadingStrategy, setLoadingStrategy] = useState<string|null>(null); 
    const inFlightRef = useRef(false);
    const {startSSOFlow} = useSSO();

    const handleSocialAuth = async (strategy: 'oauth_google' | 'oauth_apple') => {
        
        if(inFlightRef.current) {
            return;
        }

        inFlightRef.current = true;

        setLoadingStrategy(strategy);
        
        try {
            const {createdSessionId, setActive} = await startSSOFlow({strategy});
            if(!createdSessionId || !setActive) {
                const provider = strategy === 'oauth_google' ? 'Google' : 'Apple';
                Alert.alert('Error', `Failed to authenticate with ${provider}. No session was created.`);
                return;
            }

            await setActive({session: createdSessionId});

        } catch (error) {
            console.error(`Error during ${strategy} authentication:`, error);
            const provider = strategy === 'oauth_google' ? 'Google' : 'Apple';
            Alert.alert('Error', `Failed to authenticate with ${provider}. Please try again.`);
        } finally {
            inFlightRef.current = false;
            setLoadingStrategy(null);
        }
    };

    return {
        handleSocialAuth,
        loadingStrategy
    }; 
}

export default useSocialAuth;