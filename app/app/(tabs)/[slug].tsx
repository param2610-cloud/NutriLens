import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import ProductDetails from "@/components/ProductDetails";

const slug = () => {
  const { slug } = useLocalSearchParams();

  useEffect(() => {
    console.log("get from api",slug);
  }, [slug]);
  return <ProductDetails />;
};

export default slug;
