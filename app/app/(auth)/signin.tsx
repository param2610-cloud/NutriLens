import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { login, register, verifyToken } from '../../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";


export default function SignIN() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email, password);
  const handleLogin = async () => {
    try {
        const response = await login(email, password);
        console.log(response)
        const token = response.data.token;
        console.log(token)
        await AsyncStorage.setItem('token', token);
        router.push("/(tabs)/home")
    } catch (error) {
        console.error(error);
    }
};
  const handleSignUp = async () => {
    try {
        const response = await register(email, password);
        console.log("response\n",response)
        if(response.status==201){
          try {
            const response = await login(email, password);
            console.log(response)
            const token = response.data.token;
            console.log(token)
            await AsyncStorage.setItem('token', token);
            router.push("/(tabs)/home")
        } catch (error) {
            console.error(error);
        }
        }
    } catch (error) {
        console.error(error);
    }
};

useEffect(() => {
  console.log("triggered")
  const getToken = async () => {
      try {
          const token = await AsyncStorage.getItem('token');
          // Now you have the token, you can verify it
          console.log(token)
          const loggedIN =await verifyToken(token); // Call a function to verify the token
          return loggedIN
      } catch (error) {
          console.error('Error retrieving token from AsyncStorage:', error);
          // Handle error (e.g., redirect to login screen)
      }
  };
  getToken().then((loggedIN) => {
  if (loggedIN) {
    router.push("/(tabs)/home")
    } 
      });
}, []);
  return (
    <View className="flex-1 justify-center items-center bg-[#FAFAF0]">
      <Text className="text-[50px] font-bold">NutriLogin</Text>
      <View className="w-screen p-6">
        <Text variant="titleLarge" className="pl-1">
          Email
        </Text>
        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View className="w-screen p-6">
        <Text variant="titleLarge" className="pl-1">
          Password
        </Text>

        <TextInput
          mode="outlined"
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <Button mode="contained" className="w-[300px] h-[50px] justify-center bg-[#674DFF]" onPress={handleLogin}>
        <Text
          variant="titleLarge"
          className="font-bold text-white justify-center"
        >
          Sign In
        </Text>
      </Button>
      <Button mode="contained" className="w-[300px] h-[50px] justify-center mt-7 bg-[#674DFF]" onPress={handleSignUp}>
        <Text
          variant="titleLarge"
          className="font-bold text-white justify-center"
        >
          Sign Up
        </Text>
      </Button>
    </View>
  );
}
