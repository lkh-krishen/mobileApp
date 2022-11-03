import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import Home from "./components/Home";
import MyAccount from "./components/MyAccount";
import { useLogin } from "./context/LoginProvider";
import { getData } from "./utils/methods";

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
  const textStyle = {
    fontWeight: "bold",
    fontSize: 22,
  };

  const { setIsLoggedIn, profile } = useLogin();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    //gets user data from async storage
    try {
      const data = await AsyncStorage.getItem("data");
      if (data) {
        setUserData(JSON.parse(data));
      }
    } catch (e) {
      console.dir("GET data error-", e);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
            backgroundColor: "#f6f6f6",
            marginBottom: 20,
          }}
        >
          <View>
            <Text style={textStyle}>{userData.name}</Text>
            <Text>{userData.email}</Text>
          </View>
          <Image
            source={{
              uri:
                profile.avatar ||
                "https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 0,
          left: 0,
          bottom: 50,
          backgroundColor: "#FBDEE6",
          padding: 20,
        }}
        onPress={() => setIsLoggedIn(false)}
      >
        <Text style={{ color: "#DE3163", fontWeight: "bold" }}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "transparent",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitle: "",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen component={Home} name="Home" />
      <Drawer.Screen component={MyAccount} name="My Account" />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
