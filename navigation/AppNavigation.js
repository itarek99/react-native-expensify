import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import AddTripScreen from '../screens/AddTripScreen';
import HomeScreen from '../screens/HomeScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../config/firebase';
import { setUser } from '../redux/features/userSlice';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SplashScreen from '../screens/SplashScreen';
import TripExpenses from '../screens/TripExpensesScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  onAuthStateChanged(auth, userObject => {
    dispatch(setUser(userObject));
  });

  useEffect(() => {
    const loginWithSavedData = async () => {
      setLoading(true);
      try {
        const email = await AsyncStorage.getItem('email');
        const password = await AsyncStorage.getItem('password');
        if (email && password) {
          signInWithEmailAndPassword(auth, email, password).then(() => {
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        Snackbar.show({
          text: error.message,
          backgroundColor: colors.error,
        });
      }
    };

    loginWithSavedData();
  }, []);

  if (loading) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="splash">
          <Stack.Screen
            name="splash"
            options={{ title: 'Splash', headerShown: false }}
            component={SplashScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen
            name="home"
            options={{
              title: 'Home',
              headerShown: false,
              animation: 'slide_from_right',
            }}
            component={HomeScreen}
          />

          <Stack.Screen
            name="add-trip"
            options={{ title: 'Add Trip', headerShown: false }}
            component={AddTripScreen}
          />
          <Stack.Screen
            name="trip-expenses"
            options={{ title: 'Trip Expenses', headerShown: false }}
            component={TripExpenses}
          />
          <Stack.Screen
            name="add-expense"
            options={{ title: 'Trip Expenses', headerShown: false }}
            component={AddExpenseScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="welcome">
          <Stack.Screen
            name="welcome"
            options={{
              title: 'Welcome',
              headerShown: false,
              animation: 'slide_from_right',
            }}
            component={WelcomeScreen}
          />
          <Stack.Screen
            name="sign-in"
            options={{
              title: 'Sign In',
              headerShown: false,
              presentation: 'modal',
              animation: 'fade_from_bottom',
            }}
            component={SignInScreen}
          />
          <Stack.Screen
            name="sign-up"
            options={{
              title: 'Sign Up',
              headerShown: false,
              presentation: 'modal',
              animation: 'fade_from_bottom',
            }}
            component={SignUpScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default AppNavigation;
