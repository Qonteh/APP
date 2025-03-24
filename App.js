// App.js - Complete file with correct imports
import React, { createContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

// IMPORTANT: All imports must start with "./" for relative paths
import OnboardingScreen from "./src/screens/OnboardingScreen";
import AuthScreen from "./src/screens/AuthScreen";
import HomeScreen from "./src/screens/HomeScreen";
import CoursesScreen from "./src/screens/CoursesScreen";
import CourseDetailScreen from "./src/screens/CourseDetailScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

// Create the ThemeContext directly in App.js
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  const colors = {
    light: {
      primary: '#4CAF50',
      background: '#FFFFFF',
      card: '#FFFFFF',
      text: '#333333',
      border: '#EEEEEE',
      notification: '#FF3B30',
      secondaryText: '#757575',
      inputBackground: '#F5F5F5',
    },
    dark: {
      primary: '#4CAF50',
      background: '#121212',
      card: '#1E1E1E',
      text: '#FFFFFF',
      border: '#2C2C2C',
      notification: '#FF453A',
      secondaryText: '#ADADAD',
      inputBackground: '#2C2C2C',
    },
  };
  
  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      colors: colors[theme],
      isDark: theme === 'dark'
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Create navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator for Courses section
const CoursesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#4CAF50",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="CoursesList" component={CoursesScreen} options={{ title: "Courses", headerShown: false }} />
      <Stack.Screen
        name="CourseDetail"
        component={CourseDetailScreen}
        options={({ route }) => ({ title: route.params?.title || "Course Details" })}
      />
    </Stack.Navigator>
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
      <Tab.Screen name="Courses" component={CoursesStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Main App component with navigation setup
export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="Main" component={MainTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}