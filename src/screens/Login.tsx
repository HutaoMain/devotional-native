import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackNavigationType } from "../NavigationProps";
import useAuthStore from "../zustand/AuthStore";
import { AntDesign } from "@expo/vector-icons";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { FontAwesome5 } from "@expo/vector-icons";
import { loginStyles } from "../Styles";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const auth = FIREBASE_AUTH;

  const setUser = useAuthStore((state) => state.setUser);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackNavigationType>>();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      setUser(email);
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
        <View style={loginStyles.input_container}>
          <AntDesign name="user" size={24} color="black" />
          <TextInput
            style={loginStyles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={loginStyles.input_container}>
          <AntDesign name="lock" size={24} color="black" />
          <TextInput
            style={loginStyles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View style={loginStyles.forgotContainer}>
          <Text></Text>
          <TouchableOpacity style={loginStyles.forgotPass}>
            <Text>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={loginStyles.button} onPress={handleLogin}>
          <Text style={loginStyles.buttonText}>
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
