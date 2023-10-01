import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackNavigationType } from "../types/NavigationProps";
import Toast from "react-native-toast-message";
import { FontAwesome5 } from "@expo/vector-icons";
import { registrationStyles, loginStyles } from "../Styles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const auth = FIREBASE_AUTH;

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackNavigationType>>();

  const handleRegistration = async () => {
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        Toast.show({
          type: "error",
          text1: `Password do not match.`,
        });
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);
      Toast.show({
        type: "success",
        text1: `Successfully registered your account.`,
      });
      setLoading(false);
      setTimeout(() => {
        navigation.navigate("Login");
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleGoBackToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={registrationStyles.registration}>
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
          <Text style={styles.input_label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.input_container}>
          <Text style={styles.input_label}>Full Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.input_container}>
          <Text style={styles.input_label}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.input_container}>
          <Text style={styles.input_label}>Confirm Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          style={[
            registrationStyles.button,
            email && name && password && confirmPassword
              ? registrationStyles.buttonEnabled
              : registrationStyles.buttonDisabled,
          ]}
          onPress={handleRegistration}
          disabled={!email || !name || !password || !confirmPassword}
        >
          <Text style={registrationStyles.buttonText}>
            {loading ? "Please wait..." : "Register"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={registrationStyles.button}
          onPress={handleGoBackToLogin}
        >
          <Text style={registrationStyles.buttonGoBack}>Go back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D5D5D5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input_container: {
    width: "90%",
  },
  input_label: {
    paddingLeft: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 13,
    marginBottom: 10,
    marginTop: 3,
  },
});
