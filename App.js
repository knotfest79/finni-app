import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "./context/ThemeContext";
import AuthenticatedStack from "./navigations/AuthenticatedStack";
import UnauthenticatedStack from "./navigations/UnauthenticatedStack";
import { useState } from "react";
import { getIdTokenResult } from "firebase/auth/web-extension";
import ExpenseContextProvider from "./store/expense-context";

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(getIdTokenResult);

  return (
    <ThemeProvider>
      <ExpenseContextProvider>
        <StatusBar style="auto" />
        <NavigationContainer>
          {isAuthenticated ? <AuthenticatedStack /> : <UnauthenticatedStack />}
        </NavigationContainer>
      </ExpenseContextProvider>
    </ThemeProvider>
  );
}
