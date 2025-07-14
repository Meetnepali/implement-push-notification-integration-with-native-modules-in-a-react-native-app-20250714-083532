import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme, LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, restoreSessionAsync, selectIsAuthenticated } from './store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import { RootStackParamList } from './types/navigation';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ActivityDetailScreen from './screens/ActivityDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['myfitnessapp://'],
  config: {
    screens: {
      ActivityDetail: 'activity/:id',
      Login: 'login',
      Home: 'home',
    },
  },
};

const AuthenticatedRoute = ({children}: {children: React.ReactNode}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  // We assume the screen inside Stack.Navigator
  if (!isAuthenticated) {
    return <LoginScreen />;
  }
  return <>{children}</>;
};

const Navigation = () => {
  return (
    <NavigationContainer linking={linking} theme={DefaultTheme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ActivityDetail" options={{}}>
          {() => (
            <AuthenticatedRoute>
              <ActivityDetailScreen />
            </AuthenticatedRoute>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppInitializer = ({children}: {children: React.ReactNode}) => {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    dispatch(restoreSessionAsync()).finally(() => setReady(true));
  }, [dispatch]);
  if (!ready) {
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return <>{children}</>;
};

const App = () => {
  return (
    <Provider store={store}>
      <AppInitializer>
        <Navigation />
      </AppInitializer>
    </Provider>
  );
};

export default App;
