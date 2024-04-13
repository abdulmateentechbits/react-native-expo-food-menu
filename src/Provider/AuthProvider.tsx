import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../lib/supabase";
import { AppState } from "react-native";
import { Session } from "@supabase/supabase-js";

type AuthData = {
   session: Session | null;
   sessionLoading: boolean;
}
const AuthContext = createContext<AuthData>({
    session:null,
    sessionLoading:true
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [session , setSession] = useState<Session | null>(null);
    const [sessionLoading, setSessionLoading] = useState(true)

    useEffect(() => {
        const getSession = async () => {
            try {
                const {data, error} = await supabase.auth.getSession();
                if (error) {
                    console.log("🚀 ~ getSession ~ error:", error);
                    setSessionLoading(false);
                } else {
                    setSession(data?.session);
                    setSessionLoading(false);
                }

            } catch (error) {
                console.log("🚀 ~ useEffect ~ error:", error)
                setSessionLoading(false);
            }
        }
        getSession();
        supabase.auth.onAuthStateChange((_event,session) => {
            setSession(session);
            setSessionLoading(false);
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
    })


    return (
        <AuthContext.Provider value={{ session,sessionLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>useContext(AuthContext);