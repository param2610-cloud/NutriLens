import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

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

interface Product {
  name: string;
  image: string;
  nutrients: Nutrients;
}

const product: Product = {
  name: "Product Name",
  image: "https://via.placeholder.com/150", // Replace with your image URL
  nutrients: {
    energy: "539 kcal",
    protein: "6.9 g",
    carbohydrate: "53.4 g",
    total_sugars: "2.5 g",
    added_sugars: "0.2 g",
    total_fat: "33.1 g",
    saturated_fat: "12.5 g",
    trans_fat: "0.1 g",
    sodium: "626 mg",
  },
};

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

const ProductDetails: React.FC = () => {
  const exceedsDailyValue = (nutrient: string, amount: string): boolean => {
    const numericValue = parseFloat(amount);
    return numericValue > dailyValues[nutrient];
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.productName}>{product.name}</Text>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Nutrients</Text>
        {Object.keys(product.nutrients).map((nutrient, index) => {
          const amount = product.nutrients[nutrient as keyof Nutrients].replace(
            /[^\d.]/g,
            ""
          );
          const unit = product.nutrients[nutrient as keyof Nutrients].replace(
            /[\d.]/g,
            ""
          );
          return (
            <>
              <View key={index} style={styles.nutrientRow}>
                <Text style={styles.nutrientLabel}>
                  {nutrient.replace("_", " ")}:
                </Text>
                <Text
                  style={[
                    styles.nutrientValue,
                    exceedsDailyValue(nutrient, amount) && styles.exceed,
                  ]}
                >
                  {product.nutrients[nutrient as keyof Nutrients]}
                </Text>
                <Text style={styles.dailyValue}>
                  (Daily: {dailyValues[nutrient]}
                  {unit})
                </Text>
              </View>
            </>
          );
        })}
      </View>
    </ScrollView>
  );
};

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

export default ProductDetails;
