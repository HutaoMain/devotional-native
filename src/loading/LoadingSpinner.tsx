import { View, Image } from "react-native";
import React from "react";

const LoadingSpinner = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingTop: 200,
      }}
    >
      <Image
        source={require("../../assets/loading-gif.gif")}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
};

export default LoadingSpinner;
