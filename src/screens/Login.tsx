import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackNavigationType } from "../NavigationProps";
import axios from "axios";
import useAuthStore from "../zustand/AuthStore";
import { AntDesign } from "@expo/vector-icons";
import { API_URL } from "../API_URL";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { FontAwesome5 } from "@expo/vector-icons";
import { loginStyles } from "../Styles";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const setUser = useAuthStore((state) => state.setUser);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackNavigationType>>();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/user/login`, {
        email: email,
        password: password,
      });
      setLoading(false);
      setUser(email);
      console.log(res.data);
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: `Email or password is incorrect.`,
      });
      console.log(error);
    }
  };

  const handleGoToRegisterScreen = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={loginStyles.login}>
      <View style={loginStyles.headerContainer}>
        <ImageBackground
          source={require("../../assets/background.jpg")}
          blurRadius={2}
          resizeMode="cover"
          style={loginStyles.imageBackground}
        >
          <View style={loginStyles.opacityLayout}></View>
          <View style={loginStyles.logoContainer}>
            <Text style={loginStyles.logoText}>
              All for Jesus Chris World Harvest Ministry
            </Text>
            <FontAwesome5 name="bible" size={20} color="white" />
          </View>
          <View style={loginStyles.verseContainer}>
            <Text style={loginStyles.verse}>
              "Rejoice in hope, be patient in tribulation, be constant in
              prayer."
            </Text>
            <Text style={loginStyles.verseChapter}>Romans 12:12</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
        <View style={styles.input_container}>
          <AntDesign name="user" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.input_container}>
          <AntDesign name="lock" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.forgotContainer}>
          <Text></Text>
          <TouchableOpacity style={styles.forgotPass}>
            <Text>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            {loading ? "Please wait.." : "Sign in"}
          </Text>
        </TouchableOpacity>
        <View style={loginStyles.register_container}>
          <Text style={loginStyles.text}>Don't have account yet? </Text>
          <Text
            style={loginStyles.register_text}
            onPress={handleGoToRegisterScreen}
          >
            Register
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: "#FFF4EE",
  },

  container: {
    backgroundColor: "rgba(255, 244, 238, 0.6)",
    flex: 1,

    marginTop: 170,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 8,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    objectFit: "cover",
    marginTop: 100,
    marginBottom: 50,
  },
  input_container: {
    width: "90%",
    height: 50,
    paddingLeft: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
    backgroundColor: "white",
  },
  input: {
    width: "80%",
    height: 40,
    padding: 10,
  },
  forgotContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
  },
  forgotPass: {
    backgroundColor: "transparent",
  },
  button: {
    width: "90%",
    height: 50,
    borderRadius: 20,
    marginVertical: 20,
    backgroundColor: "#5E362E",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  register_container: {
    flexDirection: "row",
  },

  register_text: {
    fontWeight: "bold",
    color: "#5E362E",
    fontSize: 18,
  },
});
