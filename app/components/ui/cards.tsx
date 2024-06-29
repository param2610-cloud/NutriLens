import { CardProps } from "@/lib/interface";
import { View,Text, StyleSheet } from "react-native";

export const generateCard = ({ id, cardTitle, cardContent }: CardProps): JSX.Element => {
    return (
      <View key={id} style={styles.card}>
        <Text style={styles.cardTitle}>{cardTitle}</Text>
        <Text>{cardContent}</Text>
      </View>
    );
  };
  
const styles = StyleSheet.create({
    card:{

    },
    cardTitle:{

    }
})