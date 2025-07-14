import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

export default function ActivityDetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'ActivityDetail'>>();
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>Activity Detail for activity #{route.params?.id}</Text>
    </View>
  );
}
