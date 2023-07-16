import { NavigationContainer } from "@react-navigation/native";
import DrawerScreen from "./DrawerScreen";

export default function Router() {
  return (
    <NavigationContainer>
      <DrawerScreen />
    </NavigationContainer>
  )
}
