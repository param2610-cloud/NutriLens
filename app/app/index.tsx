import React from "react";
import { Image, Text, View } from "react-native";
const landingPageImg = require("../assets/images/LandingPageImage.png");
import { Button } from "react-native-paper";
import { router } from "expo-router";

export default function App() {
  return (
    <View className="flex-1 justify-center items-center bg-[#FAFAF0] text-3xl">
      <Image
        className="w-[300px] h-[200px] absolute top-[100px]"
        source={landingPageImg}
      />
      <Text className="text-[30px] font-bold mt-[100px]">
        Welcome to NutriLens
      </Text>
      <Text className="text-[30px] font-bold">& start Scanning </Text>
      <Text className="mt-[20px] text-sm">
        Empower your health journey with clear and simple nutritional insights.
      </Text>
      <Button
        className="absolute bg-red-700 w-[300px] h-[50px] justify-center bottom-20"
        icon="camera"
        mode="contained"
        onPress={() => router.push("/camera")}
      >
        <Text className="text-xl justify-center">Scanner</Text>
      </Button>
      <Button
        className="absolute bg-white w-[300px] h-[50px] justify-center bottom-3 border- border-gray-400 border-solid "
        mode="contained"
        onPress={() => router.push("/(auth)/signin")}
      >
        <Text className="text-xl justify-center text-gray-500">Login</Text>
      </Button>
    </View>
  );
}
