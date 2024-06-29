import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const Profile = () => {
  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.text}>Name: John Doe</Text>
        <Text style={styles.text}>Email: johndoe@example.com</Text>
        <View style={styles.buttonContainer}>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  profileContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 16,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 16,
  },
});

export default Profile;
