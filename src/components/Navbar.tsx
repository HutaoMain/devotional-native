import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
// import UsersInitialAvatar from "./UsersInitialAvatar";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { signOut } from "firebase/auth";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import useAuthStore from "../zustand/AuthStore";
import { AntDesign } from "@expo/vector-icons";

const Navbar = () => {
  const currentUser = FIREBASE_AUTH.currentUser;

  const auth = FIREBASE_AUTH;

  const clearUser = useAuthStore((state) => state.clearUser);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Toast.show({
          type: "success",
          text1: `Successfully signout.`,
        });
        clearUser();
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: error,
        });
      });
  };
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 10,
        }}
      >
        <Image
          source={{ uri: currentUser?.photoURL || "" }}
          style={styles.avatar}
        />
        <TouchableOpacity
          onPress={handleLogout}
          style={{ alignItems: "center" }}
        >
          <AntDesign name="logout" size={24} color="black" />
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 70,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <View>
          <Text style={{ fontSize: 20 }}>Welcome,</Text>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {currentUser?.displayName}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});
