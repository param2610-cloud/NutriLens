// @ts-nocheck
import { StyleSheet, Text, View, Image, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

import StarRating from "../../components/StarRating";

interface Nutrients {
  energy: string;
  protein: string;
  carbohydrate: string;
  total_sugars: string;
  added_sugars: string;
  total_fat: string;
  saturated_fat: string;
  trans_fat: string;
  sodium: string;
}

export interface Product {
  name: string;
  image: string;
  nutrients: Nutrients;
}

const dailyValues: Record<string, number> = {
  energy: 2000,
  protein: 50,
  carbohydrate: 275,
  total_sugars: 50,
  added_sugars: 25,
  total_fat: 70,
  saturated_fat: 20,
  trans_fat: 2,
  sodium: 2300,
};

const slug = () => {
  const { slug } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | undefined>();

  const barcode = slug as string;

  useEffect(() => {
    async function fetchProduct() {
      try {
        const url = `http://192.168.125.202:8080/getProduct?code=${barcode}`;
        const res = await fetch(url);
        if (res.ok) {
          const finalData: Product = await res.json();
          
          setProduct(finalData);
          console.log(finalData)
        } else {
          Alert.alert("Please scan another item or try again");
        }
      } catch (error) {
        Alert.alert("An error occurred. Please try again.");
      }
    }
    fetchProduct();
  }, [barcode]);

  const exceedsDailyValue = (nutrient: string, amount: string, limit: number): boolean => {
    const numericValue = parseFloat(amount);
    return numericValue > limit;
  };

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.productName}>
        {console.log(product.images[0])}
        {product.name} <Text style={{ color: "#FFD700" }}>(5★)</Text>
        {/* {JSON.stringify(product)} */}
      </Text>
      <Image source={{ uri: product.images[0] }} style={styles.productImage} />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Nutrients</Text>
        {Object.keys(product.nutrient_label || {}).map((nutrient, index) => {
          const nutrientValue = product.nutrient_label[nutrient as keyof Nutrients];  
          // if (typeof nutrientValue != 'object') return null;
          if(typeof nutrientValue == 'string' || !nutrientValue) return null;
          // // const amount = nutrientValue.replace(/[^\d.]/g, "");
          console.log("NV", nutrientValue);  

          // const unit = nutrientValue.replace(/[\d.]/g, "");
          const amount = nutrientValue['value'];
          const unit = nutrientValue['unit'];
          const limit = nutrientValue['limit'];
          
          return (
            <View key={index} style={styles.nutrientRow}>
              <Text style={styles.nutrientLabel}>
                {nutrient}:
              </Text>
              <Text
                style={[
                  styles.nutrientValue,
                  exceedsDailyValue(nutrient, amount, limit) && styles.exceed,
                ]}
              >
                {nutrientValue.value}
              </Text>
              <Text style={styles.dailyValue}>
                (Daily: {limit}
                {unit})
              </Text>
            </View>
          );
        })}
      </View>
      <View style={{ marginVertical: "5%" }}>
        <Text>Give it a Rating</Text>
        <StarRating />
      </View>
    </ScrollView>
  );
};

export default slug;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  productImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#f8f8f8",
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  nutrientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  nutrientLabel: {
    fontSize: 16,
    color: "#555",
  },
  nutrientValue: {
    fontSize: 16,
    color: "#000",
  },
  dailyValue: {
    fontSize: 14,
    color: "#888",
  },
  exceed: {
    color: "red",
  },
});
