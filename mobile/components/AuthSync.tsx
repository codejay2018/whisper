import { useAuthCallback } from "@/hooks/useAuth";
import { useAuth, useUser } from "@clerk/expo";
import { useEffect, useRef } from "react";
import * as Sentry from '@sentry/react-native';

const AuthSync = () => {
    const { isSignedIn } = useAuth();
    const { user } = useUser();
    const { mutate: syncUser } = useAuthCallback();
    const hasSynced = useRef(false);

    useEffect(() => {
        if (isSignedIn && user && !hasSynced.current) {
            hasSynced.current = true;

            syncUser(undefined, {
                onSuccess: (data) => {
                    console.log("User synced successfully : ", data.user.name);
                    Sentry.logger.info(
                        Sentry.logger.fmt`User Auth Synced with backend: ${data.user.id} - ${data.user.email}`,
                        {
                            userId: data.user.id,
                            email: data.user.email,
                        }
                    );
                },
                onError: (error) => {
                    console.error("Failed to sync : ", error);
                    Sentry.logger.error('failed to sync user auth with backend', 
                        {
                            userId: user.id,
                            email: error instanceof Error ? error.message : String(error),
                        }
                    );
                }
            });
        }

        if(!isSignedIn) {
            hasSynced.current = false;
        }
        
    }, [isSignedIn, user, syncUser]);

    return null;
}

export default AuthSync