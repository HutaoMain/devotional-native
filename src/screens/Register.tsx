import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackNavigationType } from "../types/NavigationProps";
import Toast from "react-native-toast-message";
import { FontAwesome5 } from "@expo/vector-icons";
import { registrationStyles, loginStyles } from "../Styles";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import * as ImagePicker from "expo-image-picker";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const [imageBase64, setImageBase64] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const auth = FIREBASE_AUTH;

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackNavigationType>>();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (!result.canceled) {
      let base64Img = `data:image/jpg;base64,${result.assets?.[0].base64}`;
      console.log(base64Img);
      setImageBase64(base64Img);
    }
  };

  const handleRegistration = async () => {
    setLoading(true);
    try {
      if (!imageBase64) {
        console.error("No image selected");
        return;
      }

      let data = {
        file: imageBase64,
        upload_preset: "upload",
      };

      const res = fetch(
        "https://api.cloudinary.com/v1_1/alialcantara/image/upload",
        {
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json",
          },
          method: "POST",
        }
      )
        .then(async (r) => {
          let data = await r.json();
          // console.log(data.secure_url);
          setImageUrl(data.secure_url);
          return data.secure_url;
        })
        .catch((err) => console.log(err));

      setTimeout(async () => {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredentials.user;
        await updateProfile(user, {
          displayName: name,
          photoURL: imageUrl,
        });
        Toast.show({
          type: "success",
          text1: `Successfully registered your account.`,
        });
        setLoading(false);
        setImageBase64("");
        setTimeout(() => {
          navigation.navigate("Login");
        }, 2000);
      }, 2000);
    } catch (error) {
      console.error(error);
      setLoading(false);
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
      <ScrollView>
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

          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={() => pickImage()}
              style={styles.imageBtn}
            >
              <Text>Pick an image from camera roll</Text>
            </TouchableOpacity>
            {imageBase64 && (
              <Image
                source={
                  imageBase64
                    ? { uri: imageBase64 }
                    : {
                        uri: "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg",
                      }
                }
                style={{ width: 100, height: 100 }}
              />
            )}
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
            <Text style={registrationStyles.buttonGoBack}>
              Go back to Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  imageContainer: {
    width: "100%",
    alignItems: "center",
  },
  imageBtn: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    width: "90%",
    marginBottom: 10,
    marginTop: 5,
    borderRadius: 10,
  },
});
