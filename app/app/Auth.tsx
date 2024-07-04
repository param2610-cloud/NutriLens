import { app } from "@/firebase";
import { Link, router } from "expo-router";
// import { UserCredential, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React from "react";

import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Auth from '../components/auth'


import { Session } from '@supabase/supabase-js'
import * as SecureStore from 'expo-secure-store';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

// const index: React.FC = () => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   // const [user,setUser] = useState<UserCredential | null>(null)
//   // const auth = getAuth(AuthWrap);

//   const handleLogin = () => {

    
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.formContainer}>
//         <Text style={styles.title}>NutriLense Login</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           autoCapitalize="none"
//         />
//         <Button title="Login" onPress={handleLogin} />

//         <View
//           style={{
//             width: "100%",
//             padding: "0.3%",
//             backgroundColor: "black",
//             marginVertical: "7%",
//           }}
//         ></View>
//         <View
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "center",
//             alignItems: "center",
//             width: "100%",
//           }}
//         >
//           <Text>Don't have account?</Text>
//           <Link style={{ color: "#2563eb" }} href={{ pathname: "/signup" }}>
//             Signup
//           </Link>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     justifyContent: "center",
//     padding: 16,
//     backgroundColor: "#f5f5f5",
//   },
//   formContainer: {
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     padding: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   input: {
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 4,
//     marginBottom: 12,
//     paddingHorizontal: 8,
//   },
// });

// export default index;

export default function AuthWrap() {
  const [session, setSession] = useState<Session | null>(null)


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  useEffect(()=>{
    if (session && session.user){
      SecureStore.setItem("id",session.user.id)
      router.push("(tabs)/home")
    }
  },[session])

  return (
    <View>
      <Text style={styles.title}>NutriLens</Text>
      <Auth />
      {session && session.user && <Text>Success</Text>}
    </View>
  )
}

const styles =StyleSheet.create({
  title:{
    display:"flex",
    top:70,
    fontSize:30,justifyContent:"center",alignItems:"center",
    left:125,fontWeight:"bold"
  },
})