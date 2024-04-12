import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import Button from '@/src/components/Button';
import { Link, Stack } from 'expo-router';
// import { supabase } from '@/src/lib/supabase';

const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState("");

    const [isLoading,setIsLoading] = useState(false);


    const onSignIn = async () => {
        // setIsLoading(true);
        // try {
        // const result =  await supabase.auth.signInWithPassword({
        //      email: email,
        //      password: password
        //  })
        //  if(result?.data?.user){
        //      setEmail("");
        //      setPassword("")
        //  }
        //  setIsLoading(false);
        // } catch (error) {
        //  setIsLoading(false);
        //  console.log("🚀 ~ onSignUp ~ error:", error)
         
        // }
    }
    const goToSignUp =  () => {}

    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: 'Sign In'}} />
            <View style={{ rowGap: 10 }}>
                <TextInput
                    mode='outlined'
                    label="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
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
                <Button disabled={isLoading} text={isLoading ? "Logging...":"Login"} onPress={onSignIn} />
                <Link href="/sign-up" style={{ color:"blue", textAlign:'center',fontSize:21}}>Create Account</Link>
            </View>
        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        padding: 10,
    }
})