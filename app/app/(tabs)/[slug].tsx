import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";

const slug = () => {
  const { slug } = useLocalSearchParams();

  useEffect(() => {
    console.log(slug);
  }, [slug]);
  return (
    <View>
      <Text>slug</Text>
    </View>
  );
};

export default slug;
