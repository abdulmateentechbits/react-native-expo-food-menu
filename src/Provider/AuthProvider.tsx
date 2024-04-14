import { Profiler, PropsWithChildren, createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../lib/supabase";
import { AppState } from "react-native";
import { Session } from "@supabase/supabase-js";

type AuthData = {
    session: Session | null;
    sessionLoading: boolean;
    profile: any;
    isAdmin: boolean;
}
const AuthContext = createContext<AuthData>({
    session: null,
    sessionLoading: true,
    profile: null,
    isAdmin: false

});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState(null);
    const [sessionLoading, setSessionLoading] = useState(true)

    useEffect(() => {
        const fetchSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            setSession(session);

            if (session) {
                // fetch profile
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                setProfile(data || null);
            }

            setSessionLoading(false);
        };

        fetchSession();
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    AppState.addEventListener('change', (state) => {
        if (state === 'active') {
            console.log("Active state")
            supabase.auth.startAutoRefresh()
        } else {
            console.log("In Active state")
            supabase.auth.stopAutoRefresh()
        }
    });

    return (
        <AuthContext.Provider value={{
            session,
            sessionLoading,
            profile,
            isAdmin: profile?.group === 'ADMIN'
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);