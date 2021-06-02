import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../screens/Main';
import Login from '../screens/Login';
import CadastroCorretor from '../screens/Cadastro/CadastroCorretor';
import CadastroGestor from '../screens/Cadastro/CadastroGestor';
import ProfileCorretor from '../screens/ProfileCorretor/ProfileCorretor';
import ProfileGestor from '../screens/ProfileGestor/ProfileGestor';
import ResetPassword from '../screens/ResetPassword';

const Stack = createStackNavigator();

export default class Route extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            animationEnabled: false,
            headerShown: false,
          }}
        >
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CadastroCorretor" component={CadastroCorretor} />
          <Stack.Screen name="CadastroGestor" component={CadastroGestor} />
          <Stack.Screen name="ProfileCorretor" component={ProfileCorretor} />
          <Stack.Screen name="ProfileGestor" component={ProfileGestor} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
