import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";

import RootTabNavigator from "./src/navigation/RootTabNavigator";
import { queryClient } from "./src/lib/queryClient";
import { store } from "./src/store/store";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootTabNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
