import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import Button from '@/src/components/Button';
import { Link, Stack } from 'expo-router';
import { supabase } from '@/src/lib/supabase';

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState("");

    const [isLoading,setIsLoading] = useState(false);

    const onSignUp = async () => {
       setIsLoading(true);
       try {
       const result =  await supabase.auth.signUp({
            email: email,
            password: password
        })
        console.log("🚀 ~ onSignUp ~ result:", result)
        if(result?.data?.user){
            setEmail("");
            setPassword("")
        }
        setIsLoading(false);
       } catch (error) {
        setIsLoading(false);
        console.log("🚀 ~ onSignUp ~ error:", error)
        
       }
    }
    const goToSignIn =  () => {}

    return (
        <View style={styles.container}>
          <Stack.Screen options={{title: 'Sign Up'}} />
            <View style={{ rowGap: 10 }}>
                <TextInput
                    mode='outlined'
                    label="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    keyboardType='email-address'
                />
                <TextInput
                    mode='outlined'
                    label="Password"
                    placeholder='password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                {
                    errors ? (
                        <Text style={{ color: 'red' }}>{errors}</Text>
                    ) : null
                }
                <Button disabled={isLoading} text={isLoading ? "Creating Account":"Create Account"} onPress={onSignUp} />
                <Link href="/sign-in" style={{ color:"blue", textAlign:'center',fontSize:21}}>Login</Link>
            </View>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        padding: 10,
    }
})