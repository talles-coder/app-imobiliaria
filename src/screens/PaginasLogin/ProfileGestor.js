import React from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';

import Solicitaçoes from './pagesCorretor/Solicitaçoes'
import MensagensCli from './pagesCorretor/MensagensCli'
import NotasFiscais from './pagesCorretor/NotasFiscais'

import CustomDrawerCli from './component/CustomDrawerCli'


export default function ProfileGestor() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerStyle={{ width: '60%' }}
      edgeWidth={50}
      initialRouteName="Solicitaçoes"
      drawerContent={CustomDrawerCli}
      children
      screenOptions={{
        headerShown: false
      }}
    >
      <Drawer.Screen name="Dashboard" component={Solicitaçoes} />
      <Drawer.Screen name="Loteamentos" component={Solicitaçoes} />
      <Drawer.Screen name="CadastrarLoteamento" component={MensagensCli} />
      <Drawer.Screen name="GerenciarCorretores" component={MensagensCli} />
      <Drawer.Screen name="TodasReservas" component={NotasFiscais} />
      <Drawer.Screen name="MinhasReservas" component={MensagensCli} />

    </Drawer.Navigator>
  );
}