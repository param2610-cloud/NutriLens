import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import { Tabs } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Mytabs from "@/components/navigation/tabs";

export default function TabLayout() {
  return (
    // <MenuProvider>
    //   <View style={styles.container}>
    //     <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
    //       <Tabs.Screen
    //         name="home"
    //         options={{
    //           title: "Home",
    //           tabBarIcon: ({ color }) => (
    //             <FontAwesome size={28} name="home" color={color} />
    //           ),
    //         }}
    //       />
    //       <Tabs.Screen
    //         name="search"
    //         options={{
    //           title: "Search",
    //           tabBarIcon: ({ color }) => (
    //             <FontAwesome size={28} name="search" color={color} />
    //           ),
    //         }}
    //       />
    //       <Tabs.Screen
    //         name="scanner"

    //         options={{
    //           // title: "Camera",
    //           tabBarIcon: ({ color }) => (
    //             <Menu>
    //               <MenuTrigger>
    //                 <FontAwesome size={28} name="camera" color={color} />
    //               </MenuTrigger>
    //               <MenuOptions
    //                 customStyles={{
    //                   optionsContainer: styles.menuOptionsContainer,
    //                   optionWrapper: styles.menuOptionWrapper,
    //                 }}
    //               >
    //                 <MenuOption onSelect={() => console.log("Barcode selected")}>
    //                   <Text>Barcode</Text>
    //                 </MenuOption>
    //                 <MenuOption onSelect={() => console.log("Nutrition label selected")}>
    //                   <Text>Nutrition label</Text>
    //                 </MenuOption>
    //               </MenuOptions>
    //             </Menu>
    //           ),
    //         }}
    //       />
    //       <Tabs.Screen
    //         name="explore"
    //         options={{
    //           title: "Explore",
    //           tabBarIcon: ({ color }) => (
    //             <FontAwesome size={28} name="compass" color={color} />
    //           ),
    //         }}
    //       />
    //       <Tabs.Screen
    //         name="profile"
    //         options={{
    //           title: "Profile",
    //           tabBarIcon: ({ color }) => (
    //             <FontAwesome size={28} name="user" color={color} />
    //           ),
    //         }}
    //       />
    //       <Tabs.Screen
    //         name="[slug]"
    //         options={{
    //           href: null,
    //           title: "Details",
    //         }} // based on docs this will hide the tab
    //       />
    //       <Tabs.Screen
    //         name="loading"
    //         options={{
    //           href: null,
    //           title: "Loading",
    //         }} // based on docs this will hide the tab
    //       />
    //     </Tabs>
    //   </View>
    // </MenuProvider>
    <NavigationContainer independent={true}>
      <Mytabs/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  menuOptionsContainer: {
    position: 'absolute',
    top: -80, // adjust as needed
    left: 0,
    right: 0,
    zIndex: 999, // ensure it's on top of other content
  },
  menuOptionWrapper: {
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
