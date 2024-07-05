import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "@/app/(tabs)/home";
import Searchcomponent from "@/app/(tabs)/search";
import Explore from "@/app/(tabs)/explore";
import Profile from "@/app/(tabs)/profile";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Button, Dimensions, SafeAreaView } from "react-native";
import { useState } from "react";

const Tab = createBottomTabNavigator();

const CustomButton = ({title,onPress}:{title:any,onPress:any})=>{
  return (
    <TouchableOpacity onPress={onPress} style={Styles.Button}>
      <Text style={Styles.ButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const CustomTabbarComponent = ({
  children,
  onPress,
  navigation,
  route
}: {
  children: any;
  onPress: any;
  navigation:any;
  route:any
}) => {
    const [Visible, setvisible] = useState<boolean>(false)
    const handlePress = () => {
        setvisible(!Visible);
        onPress();
      };
  return (
    <>
    <TouchableOpacity
    style={{
      position: 'absolute',
      bottom: 20, // Adjust as needed to position above the tab bar
      alignSelf: 'center', // Center horizontally
      zIndex: 2, // Ensure the tab button is above the modal
    }}
      onPress={handlePress}
      style={{
        top: -30,
        justifyContent: "center",
        alignItems: "center",
        ...Styles.shadow,
      }}
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: "#674DFF",
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
    {/* <Modal
    style={Styles.Modal}
    animationType="slide"
    transparent={true}
    visible={Visible}
    onRequestClose={()=>{
        setvisible(!Visible)
    }}
    >
    </Modal> */}
        {Visible && <View style={Styles.modaloverlay}>
          <View style={Styles.modalContent}>

          <CustomButton title="Barcode" onPress={() => null} />
          <CustomButton title="Food Label" onPress={() => null} />
                
          </View>
        </View>}
    </>
  );
};

export default function Mytabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#ffff",
          borderRadius: 15,
          height: 60,
          ...Styles.shadow,
        },
        tabBarIcon: ({ focused }) => {
          let iconName = "camera";

          return <FontAwesome name="camera" size={28} />;
        },
        tabBarShowLabel: false,
        
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <FontAwesome
                name="home"
                size={28}
                color={focused ? "#674DFF" : "#5E5E8F"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Searchcomponent}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <FontAwesome
                name="search"
                size={28}
                color={focused ? "#674DFF" : "#5E5E8F"}
              />
            </View>
          ),
        }}
      />
<Tab.Screen
  name="Scanner"
  component={Scanner}
  options={{
    tabBarIcon: ({ focused }) => (
      <FontAwesome name="camera" size={36} color="#FFFFFF" />
    ),
    tabBarButton: (props) => (
      <TouchableOpacity onPress={() => {null}} disabled={true}>
        <CustomTabbarComponent {...props} />
      </TouchableOpacity>
    ),
  }}
/>
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <FontAwesome
                name="compass"
                size={28}
                color={focused ? "#674DFF" : "#5E5E8F"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <FontAwesome
                name="user"
                size={28}
                color={focused ? "#674DFF" : "#5E5E8F"}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Scanner = () => {
  return (
    <>
    <SafeAreaView>
      <View>
        <Text>Please Tap Camera Button twice to select which element you going to scan.</Text>
        <Text>Thank you for co operating with us.</Text>
      </View>
    </SafeAreaView>
    </>
  );
};

const { width } = Dimensions.get('window');

const Styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  modaloverlay:{
    backgroundColor:'rgba(0,0,0,0.0)',
    position:'absolute',
    bottom:100,
    width:'100%',
    display:'flex',
    alignItems:"center",
   
  },
  modalContent:{
    width: width * 0.8, 
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 10,
  },
  Button:{

  },
  Modal:{
    position:'absolute',
    bottom:100,
    backgroundColor:'black'
  }
});
