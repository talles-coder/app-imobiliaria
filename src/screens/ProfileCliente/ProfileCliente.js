import React from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Profissionais from './pages/Profissionais'
import Mensagens from './pages/Mensagens'
import Chamados from './pages/Chamados'
import Pagamentos from './pages/Pagamentos'
import Pesquisa from './pages/Pesquisa'

import CustomDrawer from './component/CustomDrawer'

export default function ProfileCliente() {
  const Drawer = createDrawerNavigator();

  return (
    // <NavigationContainer>
    <Drawer.Navigator
      drawerStyle={{ width: '60%' }}
      edgeWidth={50}
      initialRouteName="Profissionais"
      drawerContent={CustomDrawer}
      screenOptions={{
        headerShown: false
      }}
      children

    >
      <Drawer.Screen name="Profissionais" component={Profissionais} />
      <Drawer.Screen name="Mensagens" component={Mensagens} />
      <Drawer.Screen name="Seus Chamados" component={Chamados} />
      <Drawer.Screen name="Pagamentos" component={Pagamentos} />
      <Drawer.Screen name="Pesquisa" component={Pesquisa} />


    </Drawer.Navigator>

    // </NavigationContainer>

  );
}