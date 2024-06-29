import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Button } from "react-native";

interface StarRatingProps {
  maxStars?: number;
  rating?: number;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  maxStars = 5,
  rating = 0,
  onRatingChange,
}) => {
  const [currentRating, setCurrentRating] = useState(rating);

  const handlePress = (newRating: number) => {
    setCurrentRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
    console.log(newRating); // Log the new rating instead of currentRating
  };

  const handleSubmit = () => {
    if (onRatingChange) {
      onRatingChange(currentRating);
    }
    alert(`Submitted Rating: ${currentRating}`);
  };

  return (
    <>
      <View style={styles.starContainer}>
        {[...Array(maxStars)].map((_, index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(index + 1)}>
            <Text
              style={index < currentRating ? styles.starFilled : styles.star}
            >
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Submit Rating" onPress={handleSubmit} />
    </>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 16,
  },
  star: {
    fontSize: 32,
    color: "#ccc",
  },
  starFilled: {
    fontSize: 32,
    color: "#FFD700",
  },
});

export default StarRating;
