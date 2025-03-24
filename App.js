import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Import screens
import OnboardingScreen from "./src/screens/OnboardingScreen";
import AuthScreen from "./src/screens/AuthScreen";
import HomeScreen from "./src/screens/HomeScreen";
import CoursesScreen from "./src/screens/CoursesScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

// Create navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CoursesStack = createNativeStackNavigator();

// Stack Navigator for Courses section
const CoursesStackNavigator = () => {
  return (
    <CoursesStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#4CAF50",
        },
        headerTintColor: "white",
      }}
    >
      <CoursesStack.Screen
        name="CoursesList"
        component={CoursesScreen}
        options={{ title: "Courses", headerShown: false }}
      />
    </CoursesStack.Navigator>
  );
};

// Bottom Tab Navigator for main app screens
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Courses") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "#757575",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#EEEEEE",
          elevation: 8,
          shadowOpacity: 0.1,
          shadowRadius: 4,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: "#4CAF50",
        },
        headerTintColor: "white",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Courses" component={CoursesStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Main App component with navigation setup
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}