import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
// import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';

const HomeScreen: React.FC = () => {
  useEffect(()=>{
    SecureStore.getItem("id");
  },[])
  
  const socialMediaPosts = [    
    {
      id: 1,
      title: "Post 1",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      title: "Post 2",
      content:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    },
    {
      id: 3,
      title: "Post 3",
      content:
        "Nullam commodo turpis in magna bibendum, at dapibus mi tincidunt.",
    },
    {
      id: 4,
      title: "Post 3",
      content:
        "Nullam commodo turpis in magna bibendum, at dapibus mi tincidunt.",
    },
    {
      id: 5,
      title: "Post 3",
      content:
        "Nullam commodo turpis in magna bibendum, at dapibus mi tincidunt.",
    },
    {
      id: 6,
      title: "Post 3",
      content:
        "Nullam commodo turpis in magna bibendum, at dapibus mi tincidunt.",
    },
    {
      id: 7,
      title: "Post 3",
      content:
        "Nullam commodo turpis in magna bibendum, at dapibus mi tincidunt.",
    },
    {
      id: 8,
      title: "Post 3",
      content:
        "Nullam commodo turpis in magna bibendum, at dapibus mi tincidunt.",
    },
    {
      id: 9,
      title: "Post 3",
      content:
        "Nullam commodo turpis in magna bibendum, at dapibus mi tincidunt.",
    },
    {
      id: 10,
      title: "Post 3",
      content:
        "Nullam commodo turpis in magna bibendum, at dapibus mi tincidunt.",
    },
    {
      id: 11,
      title: "Post 3",
      content:
        "Nullam commodo turpis in magna bibendum, at dapibus mi tincidunt.",
    },
    {
      id: 12,
      title: "Post 3",
      content:
        "Nullam commodo turpis in magna bibendum, at dapibus mi tincidunt.",
    },
    {
      id: 13,
      title: "Post 3",
      content:
        "Nullam commodo turpis in magna bibendum, at dapibus mi tincidunt.",
    },
    // Add more posts as needed
  ];
  const handleCameraPress = () => {
    router.push("../camera")
    console.log('Camera button pressed!');
  };
  const handlePostPress = (id:number) => {
    router.push(`/${id}`);
    console.log(id)
  }

  return (
    <View style={styles.container}>
      {/* List of social media-like posts */}
      <ScrollView style={styles.scrollView}>
        {socialMediaPosts.map((post) => (
          <TouchableOpacity
            key={post.id}
            style={styles.card}
            onPress={() => handlePostPress(post.id)}
          >
            <Text style={styles.cardTitle}>{post.title}</Text>
            <Text>{post.content}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Camera button at bottom left */}
      {/* <TouchableOpacity style={styles.cameraButton} onPress={handleCameraPress}>
        <MaterialIcons name="camera-alt" size={24} color="white" />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 16,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cameraButton: {
    position: "absolute",
    bottom: 16,
    left: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default HomeScreen;
