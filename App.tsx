import RootNavigation from "./src/navigation/RootNavigation";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <>
      <RootNavigation />
      <Toast position="top" topOffset={40} />
    </>
  );
}
