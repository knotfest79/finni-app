import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageExpense from '../screens/ManageExpense';
import RecentExpenses from '../screens/RecentExpenses';
import AllExpenses from '../screens/AllExpenses';
import Settings from '../screens/Settings';
import Home from '../screens/Home';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import { GlobalStyles } from '../constants/style';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconButton from '../components/UI/IconButton';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
    return (
        <BottomTabs.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
                headerTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: GlobalStyles.colors.primary500,
                    borderTopWidth: 0,
                    elevation: 0,
                },
                tabBarHideOnKeyboard: true,
                tabBarLabelPosition: 'below-icon',
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginBlock: -3,

                },
                tabBarIconStyle: {
                    marginTop: 4,
                },
                tabBarActiveTintColor: GlobalStyles.colors.accent500,
                headerRight: ({ tintColor }) => (
                    <IconButton icon="add-circle-outline" size={24} color={tintColor} onPress={() => {
                        navigation.navigate('ManageExpense')
                    }} />
                ),
            })}
        >

            <BottomTabs.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <BottomTabs.Screen
                name="Recent Expenses"
                component={RecentExpenses}
                options={{
                    tabBarLabel: 'Recent Expenses',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="hourglass" size={size} color={color} />
                    ),
                }}
            />
            <BottomTabs.Screen
                name="All Expenses"
                component={AllExpenses}
                options={{
                    tabBarLabel: 'All Expenses',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar" size={size} color={color} />
                    ),
                }}
            />
            <BottomTabs.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings" size={size} color={color} />
                    ),
                }}
            />
        </BottomTabs.Navigator>
    );
}

export default function AuthenticatedStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                contentStyle: {
                    flex: 1,
                    backgroundColor: GlobalStyles.colors.background,
                },
            }}
        >
            <Stack.Screen
                name="ExpensesOverview"
                component={ExpensesOverview}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ManageExpense"
                component={ManageExpense}
                options={{
                    title: 'Manage Expense',
                    headerStyle: {
                        backgroundColor: GlobalStyles.colors.primary500,
                    },
                    headerTintColor: 'white',
                    presentation: 'modal',
                }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false, presentation: 'modal' }}
            />
            <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={{ headerShown: false, presentation: 'modal' }}
            />
        </Stack.Navigator>
    );
}

