import { StyleSheet } from "react-native";

// Login Style
export const loginStyles = StyleSheet.create({
  login: {
    flex: 1,
  },
  headerContainer: {
    width: "100%",
    height: "31%",
    backgroundColor: "#ffff",
  },
  imageBackground: {
    height: "100%",
    width: "100%",
    opacity: 0.7,
    position: "relative",
  },
  opacityLayout: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    opacity: 0.7,
  },
  logoContainer: {
    position: "absolute",
    top: "20%",
    right: 45,
    elevation: 5,
    alignItems: "center",
    gap: 10,
    flexDirection: "row",
    width: 150,
  },
  logoText: {
    fontSize: 12,
    textAlign: "right",
    color: "white",
  },
  verseContainer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    width: "88%",
  },
  verse: {
    fontWeight: "bold",
    textAlign: "left",
    color: "white",
    fontSize: 20,
  },
  verseChapter: {
    fontWeight: "bold",
    textAlign: "left",
    color: "white",
  },
  register_container: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
  register_text: {
    fontWeight: "bold",
    color: "#3FCD67",
    fontSize: 18,
  },
  button: {
    width: "90%",
    height: 50,
    borderRadius: 20,
    marginVertical: 20,
    backgroundColor: "#3FCD67",
    justifyContent: "center",
    alignItems: "center",
  },
  forgotContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
  },
  forgotPass: {
    backgroundColor: "transparent",
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
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

// Registration
export const registrationStyles = StyleSheet.create({
  registration: {
    flex: 1,
  },
  button: {
    width: "90%",
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonEnabled: {
    backgroundColor: "#5E362E",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    borderColor: "#ccc",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    lineHeight: 40,
    fontSize: 16,
  },
  buttonGoBack: {
    color: "black",
    textAlign: "center",
    lineHeight: 40,
    fontSize: 16,
  },
});

// Home
export const homeStyles = StyleSheet.create({
  home: {
    paddingHorizontal: 20,
  },
  messageContainer: {
    backgroundColor: "#3FCD67",
    borderRadius: 20,
    width: "100%",
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    width: "80%",
    gap: 10,
  },
  messageTitle: {
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
    fontSize: 19,
  },
  messageBody: {
    color: "white",
    textAlign: "left",
  },
  messageVerse: {
    paddingVertical: 5,
    backgroundColor: "#79DB90",
    color: "white",
    width: 200,
    textAlign: "center",
    borderRadius: 10,
  },

  exploreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 20,
    paddingHorizontal: 5,
  },
  exploreLeft: {
    alignItems: "center",
  },
  exploreRight: {
    backgroundColor: "#79DB90",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  month: {
    fontSize: 18,
    color: "white",
  },
  day: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  exploreText: {
    fontSize: 35,
    fontWeight: "bold",
  },
  topVerseTitle: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  topVerseContainer: {
    flexDirection: "row",
    height: 100,
    width: "100%",
    gap: 20,
  },
  topVerse: {
    width: 110,
    height: 180,
    objectFit: "contain",
  },
});
