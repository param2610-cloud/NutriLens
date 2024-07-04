import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
        <Tabs.Screen
          name="barcode"
          options={{
            title: "barcode",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="camera" color={color} />
            ),
          }}
        />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="[slug]"
        options={{
          href: null,
          title: "Details",
        }} // based on docs this will hide the tab
      />
      <Tabs.Screen
        name="loading"
        options={{
          href: null,
          title: "Loading",
        }} // based on docs this will hide the tab
      />
    </Tabs>
  );
}
