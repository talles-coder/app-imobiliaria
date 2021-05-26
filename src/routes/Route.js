import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../screens/Main';
import Login from '../screens/Login';
import ScreenUm from '../screens/TransitionScreens/Apresentacao/ScreenUm';
import ScreenDois from '../screens/TransitionScreens/Apresentacao/ScreenDois';
import ScreenTres from '../screens/TransitionScreens/Apresentacao/ScreenTres';
import CadastroCliente from '../screens/Cadastro/CadastroCliente';
import CadastroTecnico from '../screens/Cadastro/CadastroTecnico';
import ProfileCliente from '../screens/ProfileCliente/ProfileCliente';
import ProfileProfissional from '../screens/ProfileProfissional/ProfileProfissional';
import ResetPassword from '../screens/ResetPassword';
import MainTransition from '../screens/TransitionScreens/MainTransition';

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
          <Stack.Screen name="MainTransition" component={MainTransition} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ScreenUm" component={ScreenUm} />
          <Stack.Screen name="ScreenDois" component={ScreenDois} />
          <Stack.Screen name="ScreenTres" component={ScreenTres} />
          <Stack.Screen name="CadastroCliente" component={CadastroCliente} />
          <Stack.Screen name="CadastroTecnico" component={CadastroTecnico} />
          <Stack.Screen name="ProfileCliente" component={ProfileCliente} />
          <Stack.Screen name="ProfileProfissional" component={ProfileProfissional} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
