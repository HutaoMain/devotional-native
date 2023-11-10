import { View, Text, Image } from "react-native";
import React from "react";
import UsersInitialAvatar from "./UsersInitialAvatar";
import useAuthStore from "../zustand/AuthStore";

const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  return (
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
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{user}</Text>
      </View>
      <UsersInitialAvatar name={user || ""} />
    </View>
  );
};

export default Navbar;
