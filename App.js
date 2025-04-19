import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "./context/ThemeContext";
import AuthenticatedStack from "./navigations/AuthenticatedStack";
import UnauthenticatedStack from "./navigations/UnauthenticatedStack";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/FirebaseConfig";
import ExpenseContextProvider from "./store/expense-context";
import SplashScreen from "./components/SplashScreen"; // if you're using one
import { SafeAreaProvider } from "react-native-safe-area-context";



export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("🔥 Auth state changed. User:", user);

      if (user && user.emailVerified) {
        setUser(user);
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return unsubscribe; // cleanup
  }, []);


  if (loading) {
    return <SplashScreen />; // or return null if no splash
  }

  return (
    <ThemeProvider>
      <ExpenseContextProvider>
        <SafeAreaProvider>
          <StatusBar style="auto" />
          <NavigationContainer>
            {user ? <AuthenticatedStack /> : <UnauthenticatedStack />}
          </NavigationContainer>
        </SafeAreaProvider>
      </ExpenseContextProvider>
    </ThemeProvider>
  );
}
