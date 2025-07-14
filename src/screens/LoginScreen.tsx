import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store';

export default function LoginScreen() {
  const dispatch = useDispatch();
  const handleLogin = () => {
    // Use a placeholder valid token
    dispatch(loginSuccess({ token: 'sample_token_abc123' }));
  };
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>Login Screen (Placeholder)</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
