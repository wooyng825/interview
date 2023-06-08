import { User, getAuth } from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import nookies from 'nookies';

const AuthContext = createContext<{ user: User | null }>({
    user: null,
});

export function AuthProvider({ children }: any) {
    const [userState, setUserState] = useState<User | null>(null);

    useEffect(() => {
        return getAuth().onIdTokenChanged(async (user) => {
            // No ID token
            if (!user) {
                setUserState(null);
                nookies.set(null, 'token', '', { path: '/' });
                return;
            }

            setUserState(user);
            const token = await user.getIdToken();
            nookies.destroy(null, 'token');
            nookies.set(null, 'token', token, { path: '/' });
        });
    }, []);

    useEffect(() => {
        const refreshToken = setInterval(async () => {
            const { currentUser } = getAuth();
            if (currentUser) await currentUser.getIdToken(true);
        }, 10 * 60 * 1000);  // 10분마다 토큰 갱신

        return () => clearInterval(refreshToken);
    }, []);

    const user = useMemo(
        () => ({
            user: userState,
        }), [userState]);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
};